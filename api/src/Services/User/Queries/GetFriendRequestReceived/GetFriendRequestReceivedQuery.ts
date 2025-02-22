import NotificationType from "@Models/Enums/NotificationType";
import { Notification } from "@Models/Notification";
import GenericResponse from "@Shared/Response/GenericResponse";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

export class GetFriendRequestReceivedQuery {
	constructor(
		public readonly currentUserId: string,
		public readonly senderId: string,
	) {}
}

@QueryHandler(GetFriendRequestReceivedQuery)
export class GetFriendRequestReceivedQueryHandler implements IQueryHandler<GetFriendRequestReceivedQuery> {
	constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

	async execute(query: GetFriendRequestReceivedQuery): Promise<GenericResponse> {
		const { currentUserId, senderId } = query;

		const notification = await this.entityManager.findOne(Notification, {
			select: ["id"],
			where: {
				receiver: { id: currentUserId },
				sender: { id: senderId },
				type: NotificationType.FRIEND_REQUEST,
			},
		});

		return new GenericResponse(notification ? notification.id : null, !!notification);
	}
}
