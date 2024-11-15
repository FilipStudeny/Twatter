import CommentListItemDto from "@Services/Comment/Shared/Comment.dto";
import PaginatedList from "@Shared/Response/PaginatedResponse";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class PaginatedCommentsResponse extends PaginatedList {
	@Field(() => [CommentListItemDto], { nullable: true })
	items?: CommentListItemDto[];

	constructor(items?: CommentListItemDto[], total?: number, page?: number, limit?: number) {
		super(total, page, limit);
		this.items = items;
	}
}
