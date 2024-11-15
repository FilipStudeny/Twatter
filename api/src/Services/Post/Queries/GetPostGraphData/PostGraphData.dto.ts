import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PostGraphDataDto {
	constructor(period: string, count: number) {
		this.period = period;
		this.count = count;
	}

	@Field()
	period: string;

	@Field(() => Int)
	count: number;
}
