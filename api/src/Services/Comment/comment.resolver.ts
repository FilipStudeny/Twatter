import GenericResponse from "@Utils/Http/GenericResponse.type";
import { CurrentUser } from "@Utils/JWT/CurrentUser";
import JwtPayload from "@Utils/JWT/JwtPayload.interface";
import { UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { RouterGuard } from "src/Guards/RouteGuard.guard";

import CreateCommentDto from "./Mutations/CreateComment/CreateComment.dto";
import { CreateCommentCommand } from "./Mutations/CreateComment/CreateCommentCommand";
import { GetPostCommentsQuery } from "./Queries/GetPostComments/GetPostCommentsQuery";
import PaginatedCommentsResponse from "./Queries/GetPostComments/PaginatedCommentsResult";
import { PinCommentCommand } from "./Mutations/PinComment/PinCommentCommand";

@Resolver()
@UseGuards(RouterGuard)
export default class CommentsResolver {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Query(() => PaginatedCommentsResponse)
	async GetComments(
		@Args("postId") postId: string,
		@Args("page", { type: () => Int }) page: number,
		@Args("limit", { type: () => Int }) limit: number,
	): Promise<PaginatedCommentsResponse> {
		return this.queryBus.execute(new GetPostCommentsQuery(postId, page, limit));
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
