import { ReactionsCount } from "@Shared/Response/ReactionsCount";
import { Field, Int, ObjectType } from "@nestjs/graphql";

import UserDetail from "./UserDetail";

@ObjectType()
export class CommentDetail {
	@Field()
	id: string;

	@Field()
	content: string;

	@Field(() => UserDetail)
	creator: UserDetail;

	@Field(() => String)
	creatorId: string;

	@Field(() => String)
	postId: string;

	@Field(() => Int)
	reactionsCount: number;

	@Field(() => ReactionsCount)
	reactions: ReactionsCount;

	@Field(() => Int)
	reportsCount: number;

	@Field(() => Int)
	strikesCount: number;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}
