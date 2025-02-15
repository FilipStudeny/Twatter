// GetUsersQuery.ts
import { NotificationsService } from "@Services/Notifications/notifications.service";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

export class GetUnreadNotificationsCountQuery {
	constructor(public readonly userId: string) {}
}

@QueryHandler(GetUnreadNotificationsCountQuery)
export default class GetUnreadNotificationsCountQueryHandler
	implements IQueryHandler<GetUnreadNotificationsCountQuery>
{
	constructor(private readonly notificationsService: NotificationsService) {}

	async execute(query: GetUnreadNotificationsCountQuery): Promise<number> {
		const { userId } = query;

		const count = await this.notificationsService.getUnreadNotificationsCount(userId);
		return count;
	}
}
