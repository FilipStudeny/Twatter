import { DbResponse } from "@Shared/DbResponse";
import { InterestDetail } from "@Shared/Response/InterestDetail";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

import PaginatedInterestsListResponse from "./PaginatedInterestsListResponse";

export class GetInterestsListQuery {
	constructor(
		public readonly page: number,
		public readonly limit: number,
		public readonly requestedFields: InterestDetail,
		public readonly interestId?: string,
	) {}
}

@QueryHandler(GetInterestsListQuery)
export class GetInterestsListQueryHandler implements IQueryHandler<GetInterestsListQuery> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(query: GetInterestsListQuery): Promise<PaginatedInterestsListResponse> {
		const { page, limit, requestedFields, interestId } = query;
		const skip = (page - 1) * limit;

		const qb = this.entityManager.createQueryBuilder("interest", "interest");
		qb.select(['interest.id AS "interest_id"', 'interest.name AS "interest_name"']);

		if (interestId) {
			qb.where("interest.id = :interestId", { interestId });
		}

		if (requestedFields.postsCount) {
			qb.leftJoin("interest.posts", "post");
			qb.addSelect('COUNT(DISTINCT post.id) AS "posts_count"');
		}

		if (requestedFields.groupsCount) {
			qb.leftJoin("interest.groups", "group");
			qb.addSelect('COUNT(DISTINCT group.id) AS "groups_count"');
		}

		// Group by fields
		qb.groupBy("interest.id").addGroupBy("interest.name");

		// Pagination
		qb.addSelect('COUNT(*) OVER() AS "total_count"');
		qb.offset(skip).limit(limit);

		const interestsWithCounts: DbResponse[] = await qb.getRawMany();
		const total = interestsWithCounts.length > 0 ? parseInt(interestsWithCounts[0].total_count, 10) : 0;
		const interests = interestsWithCounts.map((interestWithCounts) =>
			this.mapper.map(interestWithCounts, DbResponse, InterestDetail),
		);

		return new PaginatedInterestsListResponse(interests, total, page, limit);
	}
}
