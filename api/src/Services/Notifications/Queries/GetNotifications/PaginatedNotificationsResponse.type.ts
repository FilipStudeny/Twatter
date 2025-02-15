import { NotificationDetail } from "@Shared/Response/NotificationDetail";
import PaginatedList from "@Shared/Response/PaginatedResponse";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class PaginatedNotificationsResponse extends PaginatedList {
	@Field(() => [NotificationDetail], { nullable: true })
	items?: NotificationDetail[];

	constructor(items?: NotificationDetail[], total?: number, page?: number, limit?: number) {
		super(total, page, limit);
		this.items = items;
	}
}
