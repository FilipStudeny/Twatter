import AdminRole from "@Models/Enums/AdminRole";
import GenericResponse from "@Utils/Http/GenericResponse.type";
import { CurrentUser } from "@Utils/JWT/CurrentUser";
import JwtPayload from "@Utils/JWT/JwtPayload.interface";
import { UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { RouterGuard, Roles } from "src/Guards/RouteGuard.guard";

import { CreatePostDto } from "./Mutations/CreatePost/CreatePost.dto";
import { CreatePostCommand } from "./Mutations/CreatePost/CreatePostCommand";
import { GetPostDetailQuery } from "./Queries/GetPostDetail/GetPostDetailQuery";
import { PostDetailDto } from "./Queries/GetPostDetail/PostDetail.dto";

@Resolver()
@UseGuards(RouterGuard)
export default class PostsResolver {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Query(() => PostDetailDto)
	async GetPostDetail(@Args("postId") postId: string): Promise<PostDetailDto> {
		return this.queryBus.execute(new GetPostDetailQuery(postId));
	}

	@Mutation(() => GenericResponse)
	@Roles(AdminRole.ADMINISTRATOR) // Restrict to ADMINISTRATOR role only
	async CreatePost(
		@Args("createPost") createPostDto: CreatePostDto,
		@CurrentUser() payload: JwtPayload,
	): Promise<GenericResponse> {
		const userId = payload.id;
		return this.commandBus.execute(new CreatePostCommand(createPostDto, userId));
	}
}
