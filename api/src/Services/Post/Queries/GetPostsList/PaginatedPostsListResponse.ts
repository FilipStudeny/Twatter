import PaginatedList from "@Shared/Response/PaginatedResponse";
import { PostDetail } from "@Shared/Response/PostDetail";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class PaginatedPostsListResponse extends PaginatedList {
	@Field(() => [PostDetail], { nullable: true })
	items?: PostDetail[];

	constructor(items?: PostDetail[], total?: number, page?: number, limit?: number) {
		super(total, page, limit);
		this.items = items;
	}
}
