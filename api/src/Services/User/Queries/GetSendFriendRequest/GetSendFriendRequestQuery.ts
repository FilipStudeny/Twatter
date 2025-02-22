import NotificationType from "@Models/Enums/NotificationType";
import { Notification } from "@Models/Notification";
import { NotificationDetail } from "@Shared/Response/NotificationDetail";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

export class GetFriendRequestNotificationQuery {
	constructor(
		public readonly currentUserId: string,
		public readonly otherUserId: string, // Renamed for clarity
	) {}
}

@QueryHandler(GetFriendRequestNotificationQuery)
export class GetFriendRequestNotificationQueryHandler implements IQueryHandler<GetFriendRequestNotificationQuery> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(query: GetFriendRequestNotificationQuery): Promise<NotificationDetail | null> {
		const { currentUserId, otherUserId } = query;

		// We look for a FRIEND_REQUEST notification where:
		// - currentUser is the receiver and otherUser is the sender, OR
		// - currentUser is the sender and otherUser is the receiver.
		const notificationResponse = await this.entityManager.findOne(Notification, {
			where: [
				{
					type: NotificationType.FRIEND_REQUEST,
					receiver: { id: currentUserId },
					sender: { id: otherUserId },
				},
				{
					type: NotificationType.FRIEND_REQUEST,
					receiver: { id: otherUserId },
					sender: { id: currentUserId },
				},
			],
			relations: ["sender", "receiver"],
			select: {
				id: true,
				message: true,
				isRead: true,
				type: true,
				sender: {
					id: true,
					firstName: true,
					lastName: true,
				},
				receiver: {
					id: true,
					firstName: true,
					lastName: true,
				},
			},
		});

		if (!notificationResponse) {
			return null;
		}

		return this.mapper.map(notificationResponse, Notification, NotificationDetail);
	}
}
