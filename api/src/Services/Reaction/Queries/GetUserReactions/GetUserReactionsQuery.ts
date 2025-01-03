/* eslint-disable no-plusplus */
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
	) {}
}

@QueryHandler(GetUserReactionsQuery)
export class GetUserReactionsQueryHandler implements IQueryHandler<GetUserReactionsQuery> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(query: GetUserReactionsQuery): Promise<PaginatedUserReactionsResponse> {
		const { page, limit, userId } = query;

		const offset = Math.max((page - 1) * limit, 0);

		const parameters: any[] = [userId];
		let paramIndex = 2;

		const whereClause = 'r."userId" = $1';

		const mainSql = `
            SELECT
                p.id AS "post_id",
                p.content AS "post_content",
                p."postPicture" AS "post_postPicture",
                p."createdAt" AS "post_createdAt",
                p."updatedAt" AS "post_updatedAt",
                c.id AS "comment_id",
                c.content AS "comment_content",
                c."createdAt" AS "comment_createdAt",
                c."updatedAt" AS "comment_updatedAt",
                c."postId" AS "comment_post_id",
                post_creator.id AS "creator_id",
                post_creator.username AS "creator_username",
                post_creator."firstName" AS "creator_firstName",
                post_creator."lastName" AS "creator_lastName",
                post_creator."profilePictureUrl" AS "creator_profilePictureUrl",
                i.id AS "interest_id",
                i.name AS "interest_name",
                g.id AS "group_id",
                g.name AS "group_name",
                SUM(CASE WHEN reactions.type = 'like' THEN 1 ELSE 0 END) AS "like_count",
                SUM(CASE WHEN reactions.type = 'dislike' THEN 1 ELSE 0 END) AS "dislike_count",
                SUM(CASE WHEN reactions.type = 'smile' THEN 1 ELSE 0 END) AS "smile_count",
                SUM(CASE WHEN reactions.type = 'angry' THEN 1 ELSE 0 END) AS "angry_count",
                SUM(CASE WHEN reactions.type = 'sad' THEN 1 ELSE 0 END) AS "sad_count",
                SUM(CASE WHEN reactions.type = 'love' THEN 1 ELSE 0 END) AS "love_count",
                CASE
                    WHEN r."postId" IS NOT NULL THEN 'POST'
                    WHEN r."commentId" IS NOT NULL THEN 'COMMENT'
                    ELSE NULL
                END AS "reaction_target"
            FROM
                reaction AS r
            LEFT JOIN post AS p ON r."postId" = p.id
            LEFT JOIN comment AS c ON r."commentId" = c.id
            LEFT JOIN "user" AS post_creator ON 
                CASE
                    WHEN r."postId" IS NOT NULL THEN p."creatorId"
                    WHEN r."commentId" IS NOT NULL THEN c."creatorId"
                END = post_creator.id
            LEFT JOIN interest AS i ON p."interestId" = i.id
            LEFT JOIN "group" AS g ON p."groupId" = g.id
            LEFT JOIN reaction AS reactions ON reactions."postId" = p.id OR reactions."commentId" = c.id
            WHERE ${whereClause}
            GROUP BY
                p.id, p.content, p."postPicture", p."createdAt", p."updatedAt",
                c.id, c.content, c."createdAt", c."updatedAt", c."postId",
                post_creator.id, post_creator.username, post_creator."firstName", post_creator."lastName", post_creator."profilePictureUrl",
                i.id, i.name,
                g.id, g.name, r."postId", r."commentId", r."createdAt"
            ORDER BY r."createdAt" DESC
            LIMIT $${paramIndex++} OFFSET $${paramIndex++}
        `;

		parameters.push(limit, offset);
		const items: any[] = await this.entityManager.query(mainSql, parameters);
		const countSql = `
        SELECT COUNT(*) FROM (
            SELECT p.id
            FROM reaction AS r
            LEFT JOIN post AS p ON r."postId" = p.id
            LEFT JOIN comment AS c ON r."commentId" = c.id
            LEFT JOIN "user" AS u ON r."userId" = u.id
            LEFT JOIN interest AS i ON p."interestId" = i.id
            LEFT JOIN "group" AS g ON p."groupId" = g.id
            WHERE ${whereClause}
            GROUP BY
                p.id, p.content, p."postPicture", p."createdAt", p."updatedAt",
                c.id, c.content, c."createdAt", c."updatedAt", c."postId",
                u.id, u.username, u."firstName", u."lastName", u."profilePictureUrl",
                i.id, i.name,
                g.id, g.name, r."postId", r."commentId", r."createdAt"
        ) AS total_count_query
    `;

		const countParameters = parameters.slice(0, paramIndex - 3);
		const countResult = await this.entityManager.query(countSql, countParameters);
		const total = parseInt(countResult[0].count, 10);

		const mappedItems: Array<PostDetail | CommentDetail> = items
			.map((item) => {
				if (item.reaction_target === "POST") {
					const postDetail = this.mapper.map(item, DbResponse, PostDetail);
					return postDetail;
				}
				if (item.reaction_target === "COMMENT") {
					const commentDetail = this.mapper.map(item, DbResponse, CommentDetail);
					return commentDetail;
				}
				return null;
			})
			.filter((item) => item !== null);

		return new PaginatedUserReactionsResponse(mappedItems, total, page, limit);
	}
}
