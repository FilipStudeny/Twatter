import { Field, ObjectType, Int } from "@nestjs/graphql";

import { InterestDetail } from "./InterestDetail";
import { PostDetail } from "./PostDetail";
import UserDetail from "./UserDetail";

@ObjectType()
export class GroupDetail {
	@Field()
	id: string;

	@Field()
	name: string;

	@Field(() => InterestDetail)
	interest: InterestDetail;

	@Field(() => UserDetail)
	owner: UserDetail;

	@Field(() => [UserDetail])
	moderators: UserDetail[];

	@Field(() => [UserDetail])
	users: UserDetail[];

	@Field(() => Int)
	membersCount: number;

	@Field(() => [PostDetail])
	posts: PostDetail[];

	@Field(() => Int)
	postsCount: number;
}
