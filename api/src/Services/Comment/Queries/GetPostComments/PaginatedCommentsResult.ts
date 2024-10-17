import CommentListItemDto from "@Services/Comment/Shared/Comment.dto";
import PaginatedList from "@Utils/Http/PaginatedResponse.type";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class PaginatedCommentsResponse extends PaginatedList {
	@Field(() => [CommentListItemDto], { nullable: true })
	items?: CommentListItemDto[];

	constructor(items?: CommentListItemDto[], total?: number, page?: number, limit?: number, action?: string) {
		super(total, page, limit, action);
		this.items = items;
	}
}
