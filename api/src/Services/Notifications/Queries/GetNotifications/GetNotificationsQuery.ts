// GetUsersQuery.ts
import { Notification } from "@Models/Notification";
import { NotificationsService } from "@Services/Notifications/notifications.service";
import { NotificationDetail } from "@Shared/Response/NotificationDetail";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import PaginatedNotificationsResponse from "./PaginatedNotificationsResponse.type";

export class GetNotificationsQuery {
	constructor(
		public readonly userId: string,
		public readonly page: number,
		public readonly limit: number,
	) {}
}

@QueryHandler(GetNotificationsQuery)
export default class GetNotificationsQueryHandler implements IQueryHandler<PaginatedNotificationsResponse> {
	constructor(
		private readonly notificationsService: NotificationsService,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(query: GetNotificationsQuery): Promise<PaginatedNotificationsResponse> {
		const { limit, page, userId } = query;

		const { notifications, total } = await this.notificationsService.getPaginatedNotifications(
			userId,
			page,
			limit,
		);

		const mappedNotifications = notifications.map((notification) =>
			this.mapper.map(notification, Notification, NotificationDetail),
		);

		return new PaginatedNotificationsResponse(mappedNotifications, total, page);
	}
}
