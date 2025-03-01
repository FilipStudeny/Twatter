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
		public readonly currentUserId?: string,
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

		const groupByColumns: string[] = ["comment.id"];
		if (requestedFields.postId) {
			qb.addSelect('comment.postId AS "comment_post_id"');
			groupByColumns.push("comment.postId");
		}
		if (requestedFields.content) {
			qb.addSelect('comment.content AS "comment_content"');
			groupByColumns.push("comment.content");
		}
		if (requestedFields.createdAt) {
			qb.addSelect('comment."createdAt" AS "comment_createdAt"');
			groupByColumns.push('comment."createdAt"');
		}
		if (requestedFields.updatedAt) {
			qb.addSelect('comment."updatedAt" AS "comment_updatedAt"');
			groupByColumns.push('comment."updatedAt"');
		}

		if (requestedFields.myReaction) {
			qb.leftJoin("comment.reactions", "myReaction", "myReaction.userId = :currentUserId", {
				currentUserId: query.currentUserId,
			});
			qb.addSelect("myReaction.type", "myReaction");
			groupByColumns.push("myReaction.type");
		}

		if (requestedFields.creator) {
			qb.leftJoin("comment.creator", "creator");
			const creatorFields = [];

			if (requestedFields.creator.id) {
				creatorFields.push('creator.id AS "creator_id"');
				groupByColumns.push("creator.id");
			}
			if (requestedFields.creator.username) {
				creatorFields.push('creator.username AS "creator_username"');
				groupByColumns.push("creator.username");
			}
			if (requestedFields.creator.firstName) {
				creatorFields.push('creator."firstName" AS "creator_firstName"');
				groupByColumns.push('creator."firstName"');
			}
			if (requestedFields.creator.lastName) {
				creatorFields.push('creator."lastName" AS "creator_lastName"');
				groupByColumns.push('creator."lastName"');
			}
			if (requestedFields.creator.profilePictureUrl) {
				creatorFields.push('creator."profilePictureUrl" AS "creator_profilePictureUrl"');
				groupByColumns.push('creator."profilePictureUrl"');
			}
			if (creatorFields.length > 0) {
				qb.addSelect(creatorFields);
			}
		}

		if (requestedFields.reactions) {
			const reactionSelects: string[] = [];

			if (requestedFields.reactions.like) {
				reactionSelects.push(`
					(SELECT SUM(CASE WHEN r.type = 'like' THEN 1 ELSE 0 END)
					 FROM reaction r
					 WHERE r."commentId" = comment.id) AS "like_count"
				`);
			}
			if (requestedFields.reactions.dislike) {
				reactionSelects.push(`
					(SELECT SUM(CASE WHEN r.type = 'dislike' THEN 1 ELSE 0 END)
					 FROM reaction r
					 WHERE r."commentId" = comment.id) AS "dislike_count"
				`);
			}
			if (requestedFields.reactions.smile) {
				reactionSelects.push(`
					(SELECT SUM(CASE WHEN r.type = 'smile' THEN 1 ELSE 0 END)
					 FROM reaction r
					 WHERE r."commentId" = comment.id) AS "smile_count"
				`);
			}
			if (requestedFields.reactions.angry) {
				reactionSelects.push(`
					(SELECT SUM(CASE WHEN r.type = 'angry' THEN 1 ELSE 0 END)
					 FROM reaction r
					 WHERE r."commentId" = comment.id) AS "angry_count"
				`);
			}
			if (requestedFields.reactions.sad) {
				reactionSelects.push(`
					(SELECT SUM(CASE WHEN r.type = 'sad' THEN 1 ELSE 0 END)
					 FROM reaction r
					 WHERE r."commentId" = comment.id) AS "sad_count"
				`);
			}
			if (requestedFields.reactions.love) {
				reactionSelects.push(`
					(SELECT SUM(CASE WHEN r.type = 'love' THEN 1 ELSE 0 END)
					 FROM reaction r
					 WHERE r."commentId" = comment.id) AS "love_count"
				`);
			}

			if (reactionSelects.length > 0) {
				qb.addSelect(reactionSelects);
			}
		}

		if (requestedFields.reportsCount) {
			qb.addSelect(`
				(SELECT COUNT(*)
				 FROM report rep
				 WHERE rep."commentId" = comment.id) AS "reports_count"
			`);
		}

		if (requestedFields.strikesCount) {
			qb.addSelect(`
				(SELECT COUNT(*)
				 FROM strike st
				 WHERE st."commentId" = comment.id) AS "strikes_count"
			`);
		}

		qb.addSelect('COUNT(*) OVER() AS "total_count"');
		qb.groupBy(groupByColumns.join(", "));
		qb.orderBy('comment."createdAt"', "DESC");
		qb.offset(skip).limit(limit);

		const commentsWithCounts: DbResponse[] = await qb.getRawMany();
		const total = commentsWithCounts.length > 0 ? parseInt(commentsWithCounts[0].total_count, 10) : 0;
		const comments = commentsWithCounts.map((raw) => this.mapper.map(raw, DbResponse, CommentDetail));

		return new PaginatedCommentsListResponse(comments, total, page, limit);
	}
}
