import { DbResponse } from "@Shared/DbResponse";
import { PostDetail } from "@Shared/Response/PostDetail";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

import PaginatedPostsListResponse from "./PaginatedPostsListResponse";

export class GetPostsListQuery {
	constructor(
		public readonly page: number,
		public readonly limit: number,
		public readonly requestedFields: PostDetail,
		public readonly creatorId?: string,
		public readonly postId?: string,
		public readonly interestId?: string,
		public readonly groupId?: string,
	) {}
}

@QueryHandler(GetPostsListQuery)
export class GetPostsListQueryHandler implements IQueryHandler<GetPostsListQuery> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(query: GetPostsListQuery): Promise<PaginatedPostsListResponse> {
		const { page, limit, requestedFields, creatorId, groupId, interestId, postId } = query;
		const skip = (page - 1) * limit;

		const qb = this.entityManager.createQueryBuilder("post", "post");

		qb.select(['post.id AS "post_id"']);

		if (postId) {
			qb.where("post.id = :postId", { postId });
		} else {
			if (creatorId) {
				qb.andWhere("post.creatorId = :creatorId", { creatorId });
			}

			if (interestId) {
				qb.andWhere("post.interestId = :interestId", { interestId });
			}

			if (groupId) {
				qb.andWhere("post.groupId = :groupId", { groupId });
			}
		}

		if (requestedFields.content) {
			qb.addSelect('post.content AS "post_content"');
		}

		if (requestedFields.postPicture) {
			qb.addSelect('post.postPicture AS "post_postPicture"');
		}

		if (requestedFields.createdAt) {
			qb.addSelect('post."createdAt" AS "post_createdAt"');
		}

		if (requestedFields.updatedAt) {
			qb.addSelect('post."updatedAt" AS "post_updatedAt"');
		}

		if (requestedFields.isPinned) {
			qb.addSelect('post."pinnedCommentId" AS "post_pinnedCommentId"');
		}

		if (requestedFields.creator) {
			qb.leftJoin("post.creator", "creator");

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
			if (requestedFields.creator.profilePictureUrl) {
				creatorFields.push('creator."profilePictureUrl" AS "creator_profilePictureUrl"');
			}
			if (creatorFields.length > 0) {
				qb.addSelect(creatorFields);
			}
		}

		if (requestedFields.interest) {
			qb.leftJoin("post.interest", "interest");
			const interestFields = [];
			if (requestedFields.interest.id) {
				interestFields.push('interest.id AS "interest_id"');
			}
			if (requestedFields.interest.name) {
				interestFields.push('interest.name AS "interest_name"');
			}
			if (interestFields.length > 0) {
				qb.addSelect(interestFields);
			}
		}

		if (requestedFields.reactions) {
			qb.addSelect([
				`(SELECT SUM(CASE WHEN r.type = 'like' THEN 1 ELSE 0 END) 
              FROM reaction r WHERE r."postId" = post.id) AS "like_count"`,
				`(SELECT SUM(CASE WHEN r.type = 'dislike' THEN 1 ELSE 0 END) 
              FROM reaction r WHERE r."postId" = post.id) AS "dislike_count"`,
				`(SELECT SUM(CASE WHEN r.type = 'smile' THEN 1 ELSE 0 END) 
              FROM reaction r WHERE r."postId" = post.id) AS "smile_count"`,
				`(SELECT SUM(CASE WHEN r.type = 'angry' THEN 1 ELSE 0 END) 
              FROM reaction r WHERE r."postId" = post.id) AS "angry_count"`,
				`(SELECT SUM(CASE WHEN r.type = 'sad' THEN 1 ELSE 0 END) 
              FROM reaction r WHERE r."postId" = post.id) AS "sad_count"`,
				`(SELECT SUM(CASE WHEN r.type = 'love' THEN 1 ELSE 0 END) 
              FROM reaction r WHERE r."postId" = post.id) AS "love_count"`,
			]);
		}

		if (requestedFields.commentsCount) {
			qb.leftJoin("post.comments", "comment");
			qb.addSelect('COUNT(DISTINCT comment.id) AS "comments_count"');
		}

		if (requestedFields.group) {
			qb.leftJoin("post.group", "group");
			const groupFields = [];
			if (requestedFields.group.id) {
				groupFields.push('group.id AS "group_id"');
			}
			if (requestedFields.group.name) {
				groupFields.push('group.name AS "group_name"');
			}
			if (groupFields.length > 0) {
				qb.addSelect(groupFields);
			}
		}

		qb.addSelect('COUNT(*) OVER() AS "total_count"');

		qb.groupBy(
			[
				"post.id",
				"post.content",
				"post.postPicture",
				"post.createdAt",
				"post.updatedAt",
				"post.pinnedCommentId",
				"creator.id",
				"creator.username",
				"creator.firstName",
				"creator.lastName",
				"interest.id",
				"interest.name",
				"group.id",
				"group.name",
			].join(", "),
		);

		qb.orderBy('post."createdAt"', "DESC");
		qb.offset(skip).limit(limit);

		const postsWithCounts: DbResponse[] = await qb.getRawMany();

		const total = postsWithCounts.length > 0 ? parseInt(postsWithCounts[0].total_count, 10) : 0;
		const posts = postsWithCounts.map((postWithCounts) =>
			this.mapper.map(postWithCounts, DbResponse, PostDetail),
		);
		return new PaginatedPostsListResponse(posts, total, page, limit);
	}
}
