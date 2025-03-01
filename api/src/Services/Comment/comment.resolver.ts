import GenericResponse from "@Shared/Response/GenericResponse";
import { CurrentUser } from "@Utils/JWT/CurrentUser";
import JwtPayload from "@Utils/JWT/JwtPayload.interface";
import { UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Args, Info, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";
import * as graphqlFields from "graphql-fields";
import { NoRoles, Public, RouterGuard } from "src/Guards/RouteGuard.guard";

import CreateCommentDto from "./Mutations/CreateComment/CreateComment.dto";
import { CreateCommentCommand } from "./Mutations/CreateComment/CreateCommentCommand";
import { PinCommentCommand } from "./Mutations/PinComment/PinCommentCommand";
import { GetCommentsListQuery } from "./Queries/GetCommentsList/GetCommentsListQuery";
import PaginatedCommentsListResponse from "./Queries/GetCommentsList/PaginatedCommentsListResponse";

@Resolver()
@UseGuards(RouterGuard)
export default class CommentsResolver {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Query(() => PaginatedCommentsListResponse)
	@NoRoles()
	@Public()
	async getCommentsList(
		@Args("page", { type: () => Int }) page: number,
		@Args("limit", { type: () => Int }) limit: number,
		@Args("creatorId", { type: () => String, nullable: true }) creatorId: string,
		@Args("postId", { type: () => String, nullable: true }) postId: string,
		@Args("commentId", { type: () => String, nullable: true }) commentId: string,
		@CurrentUser() payload: JwtPayload,
		@Info() info: GraphQLResolveInfo,
	) {
		const fields = graphqlFields(info);
		const authenticatedUserId = payload.id;

		return this.queryBus.execute(
			new GetCommentsListQuery(
				page,
				limit,
				fields.items,
				authenticatedUserId,
				postId,
				commentId,
				creatorId,
			),
		);
	}

	@Mutation(() => GenericResponse)
	async CreateComment(
		@Args("createComment") createCommentDto: CreateCommentDto,
		@Args("postId") postId: string,
		@CurrentUser() payload: JwtPayload,
	): Promise<GenericResponse> {
		const userId = payload.id;
		return this.commandBus.execute(new CreateCommentCommand(createCommentDto, userId, postId));
	}

	@Mutation(() => GenericResponse)
	async PinComment(
		@Args("postId") postId: string,
		@Args("commentId") commentId: string,
		@CurrentUser() payload: JwtPayload,
	): Promise<GenericResponse> {
		const userId = payload.id;
		return this.commandBus.execute(new PinCommentCommand(postId, commentId, userId));
	}
}
