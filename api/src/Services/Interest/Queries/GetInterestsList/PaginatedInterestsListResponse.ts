import { InterestDetail } from "@Shared/Response/InterestDetail";
import PaginatedList from "@Shared/Response/PaginatedResponse";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class PaginatedInterestsListResponse extends PaginatedList {
	@Field(() => [InterestDetail], { nullable: true })
	items?: InterestDetail[];

	constructor(items?: InterestDetail[], total?: number, page?: number, limit?: number) {
		super(total, page, limit);
		this.items = items;
	}
}
