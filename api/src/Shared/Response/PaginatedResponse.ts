import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class PaginatedList {
	@Field(() => Int, { nullable: true })
	total?: number;

	@Field(() => Int, { nullable: true })
	page?: number;

	@Field(() => Int, { nullable: true })
	limit?: number;

	constructor(total?: number, page?: number, limit?: number) {
		this.total = total;
		this.page = page;
		this.limit = limit;
	}
}
