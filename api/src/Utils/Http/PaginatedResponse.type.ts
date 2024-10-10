import { Field, Int, ObjectType } from "@nestjs/graphql";
import GenericResponse from "./GenericResponse.type";

@ObjectType()
export default class PaginatedList extends GenericResponse {
	@Field(() => Int, { nullable: true })
	total?: number;

	@Field(() => Int, { nullable: true })
	page?: number;

	@Field(() => Int, { nullable: true })
	limit?: number;

	constructor(
		total?: number,
		page?: number,
		limit?: number,
		action?: string,
		message: string = "SUCCESS",
	) {
		super(message, action);
		this.total = total;
		this.page = page;
		this.limit = limit;
	}
}
