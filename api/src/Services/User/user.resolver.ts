import { NotificationDto } from "@Shared/Input/NotificationDto";
import GenericResponse from "@Shared/Response/GenericResponse";
import { NotificationDetail } from "@Shared/Response/NotificationDetail";
import UserConfigurationDetail from "@Shared/Response/UserConfigurationResponse";
import { CurrentUser } from "@Utils/JWT/CurrentUser";
import JwtPayload from "@Utils/JWT/JwtPayload.interface";
import { NotFoundException, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Args, Info, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";
import * as graphqlFields from "graphql-fields";
import { Public, RouterGuard } from "src/Guards/RouteGuard.guard";

import { AddFriendRequestCommand } from "./Mutations/AddFriendRequest/AddFriendRequestCommand";
import { UpdateFriendCommand } from "./Mutations/UpdateFriend/UpdateFriendCommand";
import { UpdateUserConfigurationCommand } from "./Mutations/UpdateUserConfiguration/UpdateUserConfiguration";
import { UpdateUserConfigurationDto } from "./Mutations/UpdateUserConfiguration/UpdateUserConfiguration.dto";
import { GetFriendRequestNotificationQuery } from "./Queries/GetSendFriendRequest/GetSendFriendRequestQuery";
import { GetUserConfigurationQuery } from "./Queries/GetUserConfiguration/GetUserConfigurationQuery";
import { GetUserIsFriendQuery } from "./Queries/GetUserIsFriend/GetUserIsFriendQuery";
import { GetUsersQuery } from "./Queries/GetUsers/GetUsersQuery";
import PaginatedUsersResponse from "./Queries/GetUsers/PaginatedUsersResponse.type";

@Resolver()
@UseGuards(RouterGuard)
export default class UserResolver {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	// eslint-disable-next-line class-methods-use-this
	@Query(() => String)
	hello(): string {
		return "Hello, World!";
	}

	@Query(() => PaginatedUsersResponse)
	@Public()
	async getUsers(
		@Args("page", { type: () => Int, defaultValue: 1 }) page: number,
		@Args("limit", { type: () => Int, defaultValue: 10 }) limit: number,
		@Args("userId", { type: () => String, nullable: true }) userId: string,
		@Args("groupId", { type: () => String, nullable: true }) groupId: string,
		@Args("getAll", { type: () => Boolean, nullable: true }) getAll: boolean,
		@Args("search", { type: () => String, nullable: true }) search: string,
		@Args("friendOf", { type: () => String, nullable: true }) friendOf: string,
		@CurrentUser() payload: JwtPayload,
		@Info() info: GraphQLResolveInfo,
	) {
		const fields = graphqlFields(info);
		const authenticatedUserId = payload.id;

		return this.queryBus.execute(
			new GetUsersQuery(
				page,
				limit,
				fields.items,
				userId,
				groupId,
				getAll,
				friendOf,
				search,
				authenticatedUserId,
			),
		);
	}

	@Mutation(() => GenericResponse)
	async UpdateUserConfiguration(
		@Args("updateDto") updateDto: UpdateUserConfigurationDto,
		@CurrentUser() payload: JwtPayload,
	): Promise<GenericResponse> {
		const userId = payload.id;
		return this.commandBus.execute(new UpdateUserConfigurationCommand(updateDto, userId));
	}

	@Query(() => UserConfigurationDetail)
	async GetUserConfiguration(
		@Args("userId", { type: () => String }) userId: string,
		@CurrentUser() payload: JwtPayload,
	): Promise<GenericResponse> {
		if (payload.id !== userId) {
			throw new NotFoundException("User not found");
		}

		const response = await this.queryBus.execute(new GetUserConfigurationQuery(userId));
		return response;
	}

	@Mutation(() => GenericResponse)
	async AddFriendRequest(
		@Args("addFriendDto") dto: NotificationDto,
		@CurrentUser() payload: JwtPayload,
	): Promise<GenericResponse> {
		const userId = payload.id;
		return this.commandBus.execute(new AddFriendRequestCommand(userId, dto));
	}

	@Query(() => GenericResponse)
	async GetUserIsFriend(
		@Args("userId", { type: () => String }) userId: string,
		@CurrentUser() payload: JwtPayload,
	): Promise<GenericResponse> {
		const authenticatedUserId = payload.id;

		const response = await this.queryBus.execute(new GetUserIsFriendQuery(userId, authenticatedUserId));
		return response;
	}

	@Query(() => NotificationDetail, { nullable: true })
	async GetFriendRequest(
		@Args("userId", { type: () => String }) userId: string,
		@CurrentUser() payload: JwtPayload,
	): Promise<NotificationDetail> {
		const authenticatedUserId = payload.id;

		const response = await this.queryBus.execute(
			new GetFriendRequestNotificationQuery(authenticatedUserId, userId),
		);
		return response;
	}

	@Mutation(() => GenericResponse)
	async UpdateFriend(
		@Args("userId", { type: () => String }) userId: string,
		@CurrentUser() payload: JwtPayload,
	): Promise<GenericResponse> {
		const authenticatedUserId = payload.id;
		return this.commandBus.execute(new UpdateFriendCommand(userId, authenticatedUserId));
	}
}
