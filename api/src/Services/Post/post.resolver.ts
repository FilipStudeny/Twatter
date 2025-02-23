import AdminRole from "@Models/Enums/AdminRole";
import GenericResponse from "@Shared/Response/GenericResponse";
import { CurrentUser } from "@Utils/JWT/CurrentUser";
import JwtPayload from "@Utils/JWT/JwtPayload.interface";
import { UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Args, Info, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";
import * as graphqlFields from "graphql-fields";
import { RouterGuard, AdminOnly, NoRoles, Public } from "src/Guards/RouteGuard.guard";

import { CreatePostDto } from "./Mutations/CreatePost/CreatePost.dto";
import { CreatePostCommand } from "./Mutations/CreatePost/CreatePostCommand";
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
	@Public()
	async getPosts(
		@Args("page", { type: () => Int }) page: number,
		@Args("limit", { type: () => Int }) limit: number,
		@Args("creatorId", { type: () => String, nullable: true }) creatorId: string,
		@Args("postId", { type: () => String, nullable: true }) postId: string,
		@Args("interestId", { type: () => String, nullable: true }) interestId: string,
		@Args("groupId", { type: () => String, nullable: true }) groupId: string,
		@CurrentUser() payload: JwtPayload,

		@Info() info: GraphQLResolveInfo,
	) {
		const fields = graphqlFields(info);
		const authenticatedUserId = payload.id;

		return this.queryBus.execute(
			new GetPostsListQuery(
				page,
				limit,
				fields.items,
				authenticatedUserId,
				creatorId,
				postId,
				interestId,
				groupId,
			),
		);
	}
}
