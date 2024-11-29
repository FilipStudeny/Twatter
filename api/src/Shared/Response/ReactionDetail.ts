import ReactionType from "@Models/Enums/ReactionType";
import { ObjectType, Field } from "@nestjs/graphql";

import { CommentDetail } from "./CommentDetail";
import { PostDetail } from "./PostDetail";
import UserDetail from "./UserDetail";

@ObjectType()
export class ReactionDetail {
	@Field(() => String)
	id: string;

	@Field(() => UserDetail)
	creator: UserDetail;

	@Field(() => PostDetail, { nullable: true })
	post?: PostDetail;

	@Field(() => CommentDetail, { nullable: true })
	comment?: CommentDetail;

	@Field(() => ReactionType)
	reactionType: ReactionType;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}
