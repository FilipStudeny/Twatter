import GenericResponse from "@Shared/Response/GenericResponse";
import { CurrentUser } from "@Utils/JWT/CurrentUser";
import JwtPayload from "@Utils/JWT/JwtPayload.interface";
import { UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Args, Int, Mutation, Resolver, Query } from "@nestjs/graphql";
import { Public, RouterGuard } from "src/Guards/RouteGuard.guard";

import { CreateOrUpdateReactionCommand } from "./Mutations/CreateOrUpdateReaction/CreateOrUpdateReactionCommand";
import { CreateOrUpdateReactionDto } from "./Mutations/CreateOrUpdateReaction/CreateReaction.dto";
import { GetUserReactionsQuery } from "./Queries/GetUserReactions/GetUserReactionsQuery";
import PaginatedUserReactionsResponse from "./Queries/GetUserReactions/PaginatedUserReactionsResponse.type";

@Resolver()
@UseGuards(RouterGuard)
export class ReactionsResolver {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Mutation(() => GenericResponse)
	async AddReaction(
		@Args("createOrUpdateReactionData") createOrUpdateReactionData: CreateOrUpdateReactionDto,
		@CurrentUser() payload: JwtPayload,
	): Promise<GenericResponse> {
		return this.commandBus.execute(
			new CreateOrUpdateReactionCommand(payload.id, createOrUpdateReactionData),
		);
	}

	@Query(() => PaginatedUserReactionsResponse)
	@Public()
	async getUserReactions(
		@Args("userId") userId: string,
		@Args("page", { type: () => Int, nullable: true, defaultValue: 1 }) page: number = 1,
		@Args("limit", { type: () => Int, nullable: true, defaultValue: 10 }) limit: number = 10,
	): Promise<PaginatedUserReactionsResponse> {
		return this.queryBus.execute(new GetUserReactionsQuery(page, limit, userId));
	}
}
