import { Field, ObjectType } from "@nestjs/graphql";
import UserListItemDto from "../../Shared/UserListItem.dto";
import PaginatedList from "@Utils/Http/PaginatedResponse.type";

@ObjectType()
export default class PaginatedUsersResponse extends PaginatedList {
	@Field(() => [UserListItemDto], { nullable: true })
	items?: UserListItemDto[];

	constructor(items?: UserListItemDto[], total?: number, page?: number, limit?: number, action?: string) {
		super(total, page, limit, action);
		this.items = items;
	}
}
