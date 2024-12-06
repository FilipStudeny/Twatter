import { DbResponse } from "@Shared/DbResponse";
import { CommentDetail } from "@Shared/Response/CommentDetail";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

import PaginatedCommentsListResponse from "./PaginatedCommentsListResponse";

export class GetCommentsListQuery {
	constructor(
		public readonly page: number,
		public readonly limit: number,
		public readonly requestedFields: CommentDetail,
		public readonly postId?: string,
		public readonly commentId?: string,
		public readonly creatorId?: string,
	) {}
}

@QueryHandler(GetCommentsListQuery)
export class GetCommentsListQueryHandler implements IQueryHandler<GetCommentsListQuery> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(query: GetCommentsListQuery): Promise<PaginatedCommentsListResponse> {
		const { page, limit, requestedFields, postId, commentId, creatorId } = query;
		const skip = (page - 1) * limit;

		const qb = this.entityManager.createQueryBuilder("comment", "comment");
		qb.select(['comment.id AS "comment_id"']);

		// Filtering logic
		if (commentId) {
			qb.where("comment.id = :commentId", { commentId });
		} else {
			if (postId) {
				qb.andWhere("comment.postId = :postId", { postId });
			}
			if (creatorId) {
				qb.andWhere("comment.creatorId = :creatorId", { creatorId });
			}
		}

		// Requested fields selection
		if (requestedFields.postId) {
			qb.addSelect('comment.postId AS "post_id"');
		}

		if (requestedFields.content) {
			qb.addSelect('comment.content AS "comment_content"');
		}

		if (requestedFields.createdAt) {
			qb.addSelect('comment."createdAt" AS "comment_createdAt"');
		}

		if (requestedFields.updatedAt) {
			qb.addSelect('comment."updatedAt" AS "comment_updatedAt"');
		}

		if (requestedFields.creator) {
			qb.leftJoin("comment.creator", "creator");

			const creatorFields = [];
			if (requestedFields.creator.id) {
				creatorFields.push('creator.id AS "creator_id"');
			}
			if (requestedFields.creator.username) {
				creatorFields.push('creator.username AS "creator_username"');
			}
			if (requestedFields.creator.firstName) {
				creatorFields.push('creator."firstName" AS "creator_firstName"');
			}
			if (requestedFields.creator.lastName) {
				creatorFields.push('creator."lastName" AS "creator_lastName"');
			}
			if (creatorFields.length > 0) {
				qb.addSelect(creatorFields);
			}
		}

		if (requestedFields.reactions) {
			qb.leftJoin("comment.reactions", "reaction");
			const reactionsFields = [];

			if (requestedFields.reactions.like) {
				reactionsFields.push(
					`SUM(CASE WHEN reaction.type = 'like' THEN 1 ELSE 0 END) AS "like_count"`,
				);
			}
			if (requestedFields.reactions.dislike) {
				reactionsFields.push(
					`SUM(CASE WHEN reaction.type = 'dislike' THEN 1 ELSE 0 END) AS "dislike_count"`,
				);
			}
			if (requestedFields.reactions.smile) {
				reactionsFields.push(
					`SUM(CASE WHEN reaction.type = 'smile' THEN 1 ELSE 0 END) AS "smile_count"`,
				);
			}
			if (requestedFields.reactions.angry) {
				reactionsFields.push(
					`SUM(CASE WHEN reaction.type = 'angry' THEN 1 ELSE 0 END) AS "angry_count"`,
				);
			}
			if (requestedFields.reactions.sad) {
				reactionsFields.push(
					`SUM(CASE WHEN reaction.type = 'sad' THEN 1 ELSE 0 END) AS "sad_count"`,
				);
			}
			if (requestedFields.reactions.love) {
				reactionsFields.push(
					`SUM(CASE WHEN reaction.type = 'love' THEN 1 ELSE 0 END) AS "love_count"`,
				);
			}
			if (reactionsFields.length > 0) {
				qb.addSelect(reactionsFields);
			}
		}

		if (requestedFields.reportsCount) {
			qb.leftJoin("comment.reports", "reports");
			qb.addSelect('COUNT(DISTINCT reports.id) AS "reports_count"');
		}

		if (requestedFields.strikesCount) {
			qb.leftJoin("comment.strikes", "strikes");
			qb.addSelect('COUNT(DISTINCT strikes.id) AS "strikes_count"');
		}

		qb.addSelect('COUNT(*) OVER() AS "total_count"');

		// Group by fields
		const groupByFields = ["comment.id"];

		if (requestedFields.content) {
			groupByFields.push("comment.content");
		}
		if (requestedFields.createdAt) {
			groupByFields.push('comment."createdAt"');
		}
		if (requestedFields.updatedAt) {
			groupByFields.push('comment."updatedAt"');
		}
		if (requestedFields.creator) {
			if (requestedFields.creator.id) {
				groupByFields.push("creator.id");
			}
			if (requestedFields.creator.username) {
				groupByFields.push("creator.username");
			}
			if (requestedFields.creator.firstName) {
				groupByFields.push('creator."firstName"');
			}
			if (requestedFields.creator.lastName) {
				groupByFields.push('creator."lastName"');
			}
		}

		qb.groupBy(groupByFields.join(", "));
		qb.orderBy('comment."createdAt"', "DESC");
		qb.offset(skip).limit(limit);

		const commentsWithCounts: DbResponse[] = await qb.getRawMany();
		const total = commentsWithCounts.length > 0 ? parseInt(commentsWithCounts[0].total_count, 10) : 0;
		const comments = commentsWithCounts.map((commentWithCounts) =>
			this.mapper.map(commentWithCounts, DbResponse, CommentDetail),
		);

		return new PaginatedCommentsListResponse(comments, total, page, limit);
	}
}
