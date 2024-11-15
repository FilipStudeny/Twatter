import PaginatedList from "@Shared/Response/PaginatedResponse";
import UserDetail from "@Shared/Response/UserDetail";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class PaginatedUsersResponse extends PaginatedList {
	@Field(() => [UserDetail], { nullable: true })
	items?: UserDetail[];

	constructor(items?: UserDetail[], total?: number, page?: number, limit?: number) {
		super(total, page, limit);
		this.items = items;
	}
}
