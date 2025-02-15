import { CurrentUser } from "@Utils/JWT/CurrentUser";
import JwtPayload from "@Utils/JWT/JwtPayload.interface";
import { UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { RouterGuard } from "src/Guards/RouteGuard.guard";

import { GetNotificationsQuery } from "./Queries/GetNotifications/GetNotificationsQuery";
import PaginatedNotificationsResponse from "./Queries/GetNotifications/PaginatedNotificationsResponse.type";
import { GetUnreadNotificationsCountQuery } from "./Queries/GetUnreadNotificationsCount/GetNotificationsCountQuery";

@Resolver()
@UseGuards(RouterGuard)
export default class NotificationsResolver {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	// eslint-disable-next-line class-methods-use-this
	@Query(() => String)
	hello(): string {
		return "Hello, World!";
	}

	@Query(() => Number)
	async GetUnreadNotificationsCount(@CurrentUser() payload: JwtPayload): Promise<number> {
		const authenticatedUserId = payload.id;

		const response = await this.queryBus.execute(new GetUnreadNotificationsCountQuery(authenticatedUserId));
		return response;
	}

	@Query(() => PaginatedNotificationsResponse)
	async GetNotifications(
		@Args("page", { type: () => Int, defaultValue: 1 }) page: number,
		@Args("limit", { type: () => Int, defaultValue: 10 }) limit: number,
		@CurrentUser() payload: JwtPayload,
	) {
		const authenticatedUserId = payload.id;

		return this.queryBus.execute(new GetNotificationsQuery(authenticatedUserId, page, limit));
	}
}
