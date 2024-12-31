// get-user-reactions.query.ts

import ReactionType from "@Models/Enums/ReactionType";
import { DbResponse } from "@Shared/DbResponse";
import { CommentDetail } from "@Shared/Response/CommentDetail";
import { PostDetail } from "@Shared/Response/PostDetail";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

import PaginatedUserReactionsResponse from "./PaginatedUserReactionsResponse.type";

export class GetUserReactionsQuery {
	constructor(
		public readonly page: number,
		public readonly limit: number,
		public readonly userId: string,
		public readonly reactionTypes?: ReactionType[],
	) {}
}

@QueryHandler(GetUserReactionsQuery)
export class GetUserReactionsQueryHandler implements IQueryHandler<GetUserReactionsQuery> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(query: GetUserReactionsQuery): Promise<PaginatedUserReactionsResponse> {
		const { page, limit, userId, reactionTypes } = query;

		// Calculate offset for pagination
		const offset = (page - 1) * limit;

		// Initialize parameters array
		const parameters: any[] = [userId];
		let paramIndex = 2; // Start indexing from 2 since $1 is already used for userId

		// Build the base WHERE clause
		let whereClause = 'reaction."userId" = $1';
		if (reactionTypes && reactionTypes.length > 0) {
			const reactionPlaceholders = reactionTypes.map(() => `$${paramIndex++}`);
			whereClause += ` AND reaction.type IN (${reactionPlaceholders.join(", ")})`;
			parameters.push(...reactionTypes);
		}

		// SQL for reactions on posts
		const reactedPostsSql = `
            SELECT 
                reaction."createdAt" AS "reaction_createdAt",
                'POST' AS "type",
                CAST(post.id AS TEXT) AS "post_id",         -- Cast to TEXT
                NULL::text AS "comment_id",                 -- Placeholder for comment_id
                post.content AS "post_content",
                post."postPicture" AS "post_postPicture",
                NULL::uuid AS "comment_postId",              -- Placeholder for comment_postId
                post."createdAt" AS "post_createdAt",
                post."updatedAt" AS "post_updatedAt",
                creator.id AS "creator_id",
                creator.username AS "creator_username",
                creator."firstName" AS "creator_firstName",
                creator."lastName" AS "creator_lastName"
            FROM reaction
            LEFT JOIN post ON reaction."postId" = post.id
            LEFT JOIN "user" AS creator ON post."creatorId" = creator.id
            WHERE ${whereClause}
                AND reaction."commentId" IS NULL
        `;

		// SQL for reactions on comments
		const reactedCommentsSql = `
            SELECT 
                reaction."createdAt" AS "reaction_createdAt",
                'COMMENT' AS "type",
                NULL::text AS "post_id",                     -- Placeholder for post_id
                CAST(comment.id AS TEXT) AS "comment_id",    -- Cast to TEXT
                comment.content AS "comment_content",
                NULL::text AS "post_postPicture",             -- Placeholder for post_postPicture
                comment."postId" AS "comment_postId",
                comment."createdAt" AS "comment_createdAt",
                comment."updatedAt" AS "comment_updatedAt",
                creator.id AS "creator_id",
                creator.username AS "creator_username",
                creator."firstName" AS "creator_firstName",
                creator."lastName" AS "creator_lastName"
            FROM reaction
            LEFT JOIN comment ON reaction."commentId" = comment.id
            LEFT JOIN "user" AS creator ON comment."creatorId" = creator.id
            WHERE ${whereClause}
                AND reaction."commentId" IS NOT NULL
        `;

		// Combine both queries using UNION ALL and apply ordering and pagination
		const unionSql = `
            (${reactedPostsSql})
            UNION ALL
            (${reactedCommentsSql})
            ORDER BY "reaction_createdAt" DESC
            LIMIT $${paramIndex++} OFFSET $${paramIndex++}
        `;

		// Append limit and offset to parameters
		parameters.push(limit, offset);

		const items: any[] = await this.entityManager.query(unionSql, parameters);
		console.log(items);

		// Get total count for pagination
		const countSql = `
                SELECT COUNT(*) FROM (
                    ${reactedPostsSql}
                    UNION ALL
                    ${reactedCommentsSql}
                ) AS combined
            `;
		const countParameters = parameters.slice(0, paramIndex - 3); // Exclude limit and offset
		const countResult = await this.entityManager.query(countSql, countParameters);

		const total = parseInt(countResult[0].count, 10);

		// Map the raw results to PostDetail or CommentDetail
		const mappedItems: Array<PostDetail | CommentDetail> = items
			.map((item) => {
				if (item.type === "POST") {
					return this.mapper.map(item, DbResponse, PostDetail);
				}
				if (item.type === "COMMENT") {
					return this.mapper.map(item, DbResponse, CommentDetail);
				}
				return null;
			})
			.filter((item) => item !== null);

		return new PaginatedUserReactionsResponse(mappedItems, total, page, limit);
	}
}
