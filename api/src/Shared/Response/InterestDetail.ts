import { Field, ObjectType, Int } from "@nestjs/graphql";

import { GroupDetail } from "./GroupDetail";
import { PostDetail } from "./PostDetail";

@ObjectType()
export class InterestDetail {
	@Field(() => String, { nullable: true })
	id: string;

	@Field(() => String, { nullable: true })
	name: string;

	@Field(() => Int, { nullable: true })
	postsCount: number;

	@Field(() => Int, { nullable: true })
	groupsCount: number;

	@Field(() => [PostDetail], { nullable: true })
	posts: PostDetail[];

	@Field(() => [GroupDetail], { nullable: true })
	groups: GroupDetail[];
}
