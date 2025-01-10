import PaginatedList from "@Shared/Response/PaginatedResponse";
import { ReportDetail } from "@Shared/Response/ReportDetail";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class PaginatedReportsListResponse extends PaginatedList {
	@Field(() => [ReportDetail], { nullable: true })
	items?: ReportDetail[];

	constructor(items?: ReportDetail[], total?: number, page?: number, limit?: number) {
		super(total, page, limit);
		this.items = items;
	}
}
