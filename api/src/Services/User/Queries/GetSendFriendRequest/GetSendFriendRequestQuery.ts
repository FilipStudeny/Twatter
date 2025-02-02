import NotificationType from "@Models/Enums/NotificationType";
import { Notification } from "@Models/Notification";
import GenericResponse from "@Shared/Response/GenericResponse";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

export class GetFriendRequestNotificationQuery {
	constructor(
		public readonly receiverId: string,
		public readonly senderId: string,
	) {}
}

@QueryHandler(GetFriendRequestNotificationQuery)
export class GetFriendRequestNotificationQueryHandler implements IQueryHandler<GetFriendRequestNotificationQuery> {
	constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

	async execute(query: GetFriendRequestNotificationQuery): Promise<GenericResponse> {
		const { receiverId, senderId } = query;

		const notification = await this.entityManager.findOne(Notification, {
			select: ["id"],
			where: {
				receiver: { id: receiverId },
				sender: { id: senderId },
				type: NotificationType.FRIEND_REQUEST,
			},
		});

		return new GenericResponse(notification ? notification.id : null, !!notification);
	}
}
