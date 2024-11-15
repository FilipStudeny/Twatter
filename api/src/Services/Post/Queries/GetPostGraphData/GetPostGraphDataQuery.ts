/* eslint-disable class-methods-use-this */
import { Post } from "@Models/Post";
import { BadRequestException } from "@nestjs/common";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { registerEnumType } from "@nestjs/graphql";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

import { PostGraphDataDto } from "./PostGraphData.dto";

export enum GraphFilter {
	Day = "day",
	Month = "month",
	Year = "year",
}

registerEnumType(GraphFilter, {
	name: "GraphFilter",
	description: "Filter options for the graph data",
});

export class GetPostGraphDataQuery {
	constructor(
		public readonly filter: GraphFilter,
		public readonly year?: number,
		public readonly weekNumber?: number,
	) {}
}

@QueryHandler(GetPostGraphDataQuery)
export class GetPostGraphDataQueryHandler implements IQueryHandler<GetPostGraphDataQuery> {
	constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

	async execute(query: GetPostGraphDataQuery): Promise<PostGraphDataDto[]> {
		const { filter, year, weekNumber } = query;

		switch (filter) {
			case GraphFilter.Year:
				return this.getYearlyData();
			case GraphFilter.Month:
				if (year === undefined) {
					throw new BadRequestException(
						'Year must be provided when filter is set to "month".',
					);
				}
				return this.getMonthlyData(year);
			case GraphFilter.Day:
				if (year === undefined || weekNumber === undefined) {
					throw new BadRequestException(
						'Year and weekNumber must be provided when filter is set to "day".',
					);
				}
				return this.getDailyData(year, weekNumber);
			default:
				throw new BadRequestException("Invalid filter parameter.");
		}
	}

	private async getYearlyData(): Promise<PostGraphDataDto[]> {
		// Get the range of years from the database
		const yearsResult = await this.entityManager
			.createQueryBuilder(Post, "post")
			.select(`MIN(EXTRACT(YEAR FROM post.createdAt))`, "minYear")
			.addSelect(`MAX(EXTRACT(YEAR FROM post.createdAt))`, "maxYear")
			.getRawOne();

		const minYear = parseInt(yearsResult.minYear, 10);
		const maxYear = parseInt(yearsResult.maxYear, 10);

		const query = `
			WITH years AS (
				SELECT generate_series($1, $2) AS year_number
			),
			counts AS (
				SELECT EXTRACT(YEAR FROM post."createdAt")::int AS year_number, COUNT(post.id) AS count
				FROM "post" post
				GROUP BY year_number
			)
			SELECT years.year_number AS period, COALESCE(counts.count, 0) AS count
			FROM years
			LEFT JOIN counts ON years.year_number = counts.year_number
			ORDER BY years.year_number
		`;

		const result = await this.entityManager.query(query, [minYear, maxYear]);

		// Map the results
		return result.map(
			(item: { period: number; count: string }) =>
				new PostGraphDataDto(item.period.toString(), parseInt(item.count, 10)),
		);
	}

	private async getMonthlyData(year: number): Promise<PostGraphDataDto[]> {
		const query = `
			WITH months AS (
				SELECT generate_series(1,12) AS month_number
			),
			counts AS (
				SELECT EXTRACT(MONTH FROM post."createdAt")::int AS month_number, COUNT(post.id) AS count
				FROM "post" post
				WHERE EXTRACT(YEAR FROM post."createdAt") = $1
				GROUP BY month_number
			)
			SELECT months.month_number, COALESCE(counts.count, 0) AS count
			FROM months
			LEFT JOIN counts ON months.month_number = counts.month_number
			ORDER BY months.month_number
		`;

		const result = await this.entityManager.query(query, [year]);

		// Map month numbers to month names
		const monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];

		// Build the final result
		return result.map((item: { month_number: number; count: string }) => {
			const monthName = monthNames[item.month_number - 1];
			const count = parseInt(item.count, 10);
			return new PostGraphDataDto(monthName, count);
		});
	}

	private async getDailyData(year: number, weekNumber: number): Promise<PostGraphDataDto[]> {
		// Get the start and end dates of the specified week
		const { startOfWeek, endOfWeek } = this.getStartAndEndDatesOfISOWeek(year, weekNumber);

		const query = `
			WITH days AS (
				SELECT generate_series(1,7) AS day_number
			),
			counts AS (
				SELECT EXTRACT(ISODOW FROM post."createdAt")::int AS day_number, COUNT(post.id) AS count
				FROM "post" post
				WHERE post."createdAt" BETWEEN $1 AND $2
				GROUP BY day_number
			)
			SELECT days.day_number, COALESCE(counts.count, 0) AS count
			FROM days
			LEFT JOIN counts ON days.day_number = counts.day_number
			ORDER BY days.day_number
		`;

		const result = await this.entityManager.query(query, [startOfWeek, endOfWeek]);

		// Days of the week starting from Monday
		const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

		// Build the final result
		return result.map((item: { day_number: number; count: string }) => {
			const dayName = dayNames[item.day_number - 1];
			const count = parseInt(item.count, 10);
			return new PostGraphDataDto(dayName, count);
		});
	}

	// Helper method to get the start and end dates of a specific ISO week in a year
	private getStartAndEndDatesOfISOWeek(year: number, weekNumber: number): { startOfWeek: Date; endOfWeek: Date } {
		const simple = new Date(Date.UTC(year, 0, 4)); // The 4th of January is always in week 1
		const dayOfWeek = simple.getUTCDay() || 7; // Make Sunday (0) to be 7
		const week1Start = new Date(simple);
		week1Start.setUTCDate(simple.getUTCDate() + 1 - dayOfWeek);

		const startOfWeek = new Date(week1Start);
		startOfWeek.setUTCDate(week1Start.getUTCDate() + (weekNumber - 1) * 7);
		const endOfWeek = new Date(startOfWeek);
		endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6);

		// Set time to start and end of the day
		startOfWeek.setUTCHours(0, 0, 0, 0);
		endOfWeek.setUTCHours(23, 59, 59, 999);

		return { startOfWeek, endOfWeek };
	}
}
