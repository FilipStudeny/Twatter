import PaginatedList from "@Services/Shared/Responses/PaginatedResponse.type";
import { Field, ObjectType } from "@nestjs/graphql";
import UserListItemDto from "./UserListItem.dto";

@ObjectType()
export default class PaginatedUsersResponse extends PaginatedList {
	@Field(() => [UserListItemDto], { nullable: true })
	items?: UserListItemDto[];

	constructor(
		items?: UserListItemDto[],
		total?: number,
		page?: number,
		limit?: number,
		action?: string, // The handler's name is passed here
	) {
		// Pass action to the parent class (PaginatedList)
		super(total, page, limit, action);
		this.items = items;
	}
}
