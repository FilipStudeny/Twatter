import { Report } from "@Models/Report";
import { User } from "@Models/User";
import { ReportDetail } from "@Shared/Response/ReportDetail";
import UserDetail from "@Shared/Response/UserDetail";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

import PaginatedReportsListResponse from "./PaginatedReportsListResponse";

export class GetReportsQuery {
	constructor(
		public readonly page: number,
		public readonly limit: number,
		public readonly userId: string,
	) {}
}

@QueryHandler(GetReportsQuery)
export class GetReportsQueryHanlder implements IQueryHandler<GetReportsQuery> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(query: GetReportsQuery): Promise<PaginatedReportsListResponse> {
		const { page, limit, userId } = query;
		const offset = Math.max((page - 1) * limit, 0);

		const [items, total] = await this.entityManager
			.createQueryBuilder(Report, "r")
			.leftJoinAndSelect("r.reporter", "reporter")
			.addSelect([
				"reporter.id",
				"reporter.username",
				"reporter.firstName",
				"reporter.lastName",
				"reporter.profilePictureUrl",
			])
			.leftJoin("r.reportedPost", "rp")
			.addSelect(["rp.id"])
			.leftJoin("r.reportedComment", "rc")
			.addSelect(["rc.id"])
			.leftJoin("r.reportedUser", "ru")
			.addSelect(["ru.id"])
			.where("r.reporterId = :userId", { userId })
			.orderBy("r.createdAt", "DESC")
			.skip(offset)
			.take(limit)
			.getManyAndCount();

		const mappedItems = items.map((item) => {
			const report = this.mapper.map(item, Report, ReportDetail);

			const mappedReported = this.mapper.map(item.reporter, User, UserDetail);
			report.reporter = mappedReported;

			return report;
		});

		return new PaginatedReportsListResponse(mappedItems, total, page, limit);
	}
}
