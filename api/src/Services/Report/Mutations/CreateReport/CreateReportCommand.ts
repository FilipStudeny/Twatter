import { Comment } from "@Models/Comment";
import { Post } from "@Models/Post";
import { Report } from "@Models/Report";
import { User } from "@Models/User";
import GenericResponse from "@Shared/Response/GenericResponse";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

import { ReportDto } from "./ReportDto";

export class CreateReportCommand {
	constructor(
		public readonly reportDto: ReportDto,
		public readonly reporterId: string,
	) {}
}

@CommandHandler(CreateReportCommand)
export class CreateReportCommandHandler implements ICommandHandler<CreateReportCommand> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(command: CreateReportCommand): Promise<GenericResponse> {
		const { reportDto, reporterId } = command;

		const reporter = await this.entityManager.findOne(User, { where: { id: reporterId } });
		if (!reporter) {
			throw new NotFoundException("Your account couldn't be found, please create an account.");
		}

		const report = new Report();
		report.reportType = reportDto.reportType;
		report.message = reportDto.message;
		report.reporter = reporter;

		if (reportDto.reportedPostId) {
			const reportedPost = await this.entityManager.findOne(Post, {
				where: { id: reportDto.reportedPostId },
			});
			if (!reportedPost) {
				throw new NotFoundException("Reported post not found");
			}
			report.reportedPost = reportedPost;
		}

		if (reportDto.reportedCommentId) {
			const reportedComment = await this.entityManager.findOne(Comment, {
				where: { id: reportDto.reportedCommentId },
			});
			if (!reportedComment) {
				throw new NotFoundException("Reported comment not found");
			}
			report.reportedComment = reportedComment;
		}

		if (reportDto.reportedUserId) {
			const reportedUser = await this.entityManager.findOne(User, {
				where: { id: reportDto.reportedUserId },
			});
			if (!reportedUser) {
				throw new NotFoundException("Reported user not found");
			}
			report.reportedUser = reportedUser;
		}

		try {
			await this.entityManager.save(Report, report);
			return new GenericResponse("Report created successfully");
		} catch {
			throw new InternalServerErrorException("Failed to create the report");
		}
	}
}
