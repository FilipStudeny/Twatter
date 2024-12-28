import { Field, ObjectType, Int } from "@nestjs/graphql";

import { InterestDetail } from "./InterestDetail";
import UserDetail from "./UserDetail";

@ObjectType()
export class GroupDetail {
	@Field(() => String, { nullable: true })
	id: string;

	@Field(() => String, { nullable: true })
	name: string;

	@Field(() => InterestDetail, { nullable: true })
	interest: InterestDetail;

	@Field(() => UserDetail, { nullable: true })
	owner: UserDetail;

	@Field(() => [UserDetail], { nullable: true })
	moderators: UserDetail[];

	@Field(() => [UserDetail], { nullable: true })
	users: UserDetail[];

	@Field(() => Int, { nullable: true })
	membersCount: number;

	@Field(() => Int, { nullable: true })
	postsCount: number;
}
