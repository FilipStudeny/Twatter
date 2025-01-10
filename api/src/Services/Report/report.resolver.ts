import GenericResponse from "@Shared/Response/GenericResponse";
import { CurrentUser } from "@Utils/JWT/CurrentUser";
import JwtPayload from "@Utils/JWT/JwtPayload.interface";
import { UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Public, RouterGuard } from "src/Guards/RouteGuard.guard";

import { CreateReportCommand } from "./Mutations/CreateReport/CreateReportCommand";
import { ReportDto } from "./Mutations/CreateReport/ReportDto";
import { GetReportsQuery } from "./Queries/GetReportsQuery";
import PaginatedReportsListResponse from "./Queries/PaginatedReportsListResponse";

@Resolver()
@UseGuards(RouterGuard)
export class ReportResolver {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Mutation(() => GenericResponse)
	async CreateReport(
		@Args("createReportDto") createReportDto: ReportDto,
		@CurrentUser() payload: JwtPayload,
	): Promise<GenericResponse> {
		return this.commandBus.execute(new CreateReportCommand(createReportDto, payload.id));
	}

	@Query(() => PaginatedReportsListResponse)
	@Public()
	async GetReports(
		@Args("userId") userId: string,
		@Args("page", { type: () => Int, nullable: true, defaultValue: 1 }) page: number = 1,
		@Args("limit", { type: () => Int, nullable: true, defaultValue: 10 }) limit: number = 10,
	): Promise<PaginatedReportsListResponse> {
		return this.queryBus.execute(new GetReportsQuery(page, limit, userId));
	}
}
