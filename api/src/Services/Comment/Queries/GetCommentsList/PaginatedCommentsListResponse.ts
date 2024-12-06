import { CommentDetail } from "@Shared/Response/CommentDetail";
import PaginatedList from "@Shared/Response/PaginatedResponse";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class PaginatedCommentsListResponse extends PaginatedList {
	@Field(() => [CommentDetail], { nullable: true })
	items?: CommentDetail[];

	constructor(items?: CommentDetail[], total?: number, page?: number, limit?: number) {
		super(total, page, limit);
		this.items = items;
	}
}
