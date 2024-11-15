import AdminRole from "@Models/Enums/AdminRole";
import GenericResponse from "@Shared/Response/GenericResponse";
import { PostDetail } from "@Shared/Response/PostDetail";
import { CurrentUser } from "@Utils/JWT/CurrentUser";
import JwtPayload from "@Utils/JWT/JwtPayload.interface";
import { UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { RouterGuard, AdminOnly, PublicAdmin, NoRoles } from "src/Guards/RouteGuard.guard";

import { CreatePostDto } from "./Mutations/CreatePost/CreatePost.dto";
import { CreatePostCommand } from "./Mutations/CreatePost/CreatePostCommand";
import { GetPostDetailQuery } from "./Queries/GetPostDetail/GetPostDetailQuery";
import { GetPostGraphDataQuery, GraphFilter } from "./Queries/GetPostGraphData/GetPostGraphDataQuery";
import { PostGraphDataDto } from "./Queries/GetPostGraphData/PostGraphData.dto";
import { GetPostsListQuery } from "./Queries/GetPostsList/GetPostsListQuery";
import PaginatedPostsListResponse from "./Queries/GetPostsList/PaginatedPostsListResponse";

@Resolver()
@UseGuards(RouterGuard)
export default class PostsResolver {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Query(() => PostDetail)
	@PublicAdmin()
	async GetPostDetail(@Args("postId") postId: string): Promise<PostDetail> {
		return this.queryBus.execute(new GetPostDetailQuery(postId));
	}

	@Mutation(() => GenericResponse)
	@AdminOnly(AdminRole.ADMINISTRATOR) // Restrict to ADMINISTRATOR role only
	async CreatePost(
		@Args("createPost") createPostDto: CreatePostDto,
		@CurrentUser() payload: JwtPayload,
	): Promise<GenericResponse> {
		const userId = payload.id;
		return this.commandBus.execute(new CreatePostCommand(createPostDto, userId));
	}

	@Query(() => [PostGraphDataDto])
	@AdminOnly(AdminRole.ADMIN, AdminRole.SUPER_ADMIN, AdminRole.MODERATOR)
	async getPostsStatistics(
		@Args("filter", { type: () => GraphFilter }) filter: GraphFilter,
		@Args("year", { type: () => Int, nullable: true }) year?: number,
		@Args("weekNumber", { type: () => Int, nullable: true }) weekNumber?: number,
	): Promise<PostGraphDataDto[]> {
		return this.queryBus.execute(new GetPostGraphDataQuery(filter, year, weekNumber));
	}

	@Query(() => PaginatedPostsListResponse)
	@NoRoles()
	async getPosts(
		@Args("page", { type: () => Int, defaultValue: 1 }) page: number,
		@Args("limit", { type: () => Int, defaultValue: 10 }) limit: number,
	) {
		return this.queryBus.execute(new GetPostsListQuery(page, limit));
	}
}
