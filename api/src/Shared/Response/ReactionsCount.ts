import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ReactionsCount {
	@Field(() => Int)
	like: number = 0;

	@Field(() => Int)
	dislike: number = 0;

	@Field(() => Int)
	smile: number = 0;

	@Field(() => Int)
	angry: number = 0;

	@Field(() => Int)
	sad: number = 0;

	@Field(() => Int)
	love: number = 0;
}
