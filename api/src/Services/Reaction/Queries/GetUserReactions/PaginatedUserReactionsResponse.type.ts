// paginated-user-reactions-response.ts

import { CommentDetail } from "@Shared/Response/CommentDetail";
import PaginatedList from "@Shared/Response/PaginatedResponse";
import { PostDetail } from "@Shared/Response/PostDetail";
import { Field, ObjectType, createUnionType } from "@nestjs/graphql";

export const ReactedItemUnion = createUnionType({
	name: "ReactedItemUnion", // Changed from "items" to "ReactedItemUnion"
	types: () => [PostDetail, CommentDetail] as const,
});

@ObjectType()
export default class PaginatedUserReactionsResponse extends PaginatedList {
	@Field(() => [ReactedItemUnion], { nullable: true })
	items?: Array<PostDetail | CommentDetail>; // Corrected TypeScript type

	constructor(items?: Array<PostDetail | CommentDetail>, total?: number, page?: number, limit?: number) {
		super(total, page, limit);
		this.items = items;
	}
}
