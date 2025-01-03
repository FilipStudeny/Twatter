import GenericResponse from "@Shared/Response/GenericResponse";
import { CurrentUser } from "@Utils/JWT/CurrentUser";
import JwtPayload from "@Utils/JWT/JwtPayload.interface";
import { UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { RouterGuard } from "src/Guards/RouteGuard.guard";

import { CreateReportCommand } from "./Mutations/CreateReport/CreateReportCommand";
import { ReportDto } from "./Mutations/CreateReport/ReportDto";

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
}
