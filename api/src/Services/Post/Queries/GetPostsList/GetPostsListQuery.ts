import { InterestDetail } from "@Shared/Response/InterestDetail";
import { PostDetail } from "@Shared/Response/PostDetail";
import { ReactionsCount } from "@Shared/Response/ReactionsCount";
import UserDetail from "@Shared/Response/UserDetail";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

import PaginatedPostsListResponse from "./PaginatedPostsListResponse";

export class GetPostsListQuery {
	constructor(
		public readonly page: number,
		public readonly limit: number,
	) {}
}

@QueryHandler(GetPostsListQuery)
export default class GetPostsListQueryHandler implements IQueryHandler<GetPostsListQuery> {
	constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

	async execute(query: GetPostsListQuery): Promise<PaginatedPostsListResponse> {
		const { page, limit } = query;
		const skip = (page - 1) * limit;

		// Build the query
		const qb = this.entityManager
			.createQueryBuilder("post", "post")
			.leftJoin("post.creator", "creator")
			.leftJoin("post.interest", "interest")
			// Left join the reactions_counts subquery
			.leftJoin(
				(qb) =>
					qb
						.select('reaction."postId"', "postId")
						.addSelect(
							`SUM(CASE WHEN reaction.type = 'like' THEN 1 ELSE 0 END)`,
							"like_count",
						)
						.addSelect(
							`SUM(CASE WHEN reaction.type = 'dislike' THEN 1 ELSE 0 END)`,
							"dislike_count",
						)
						.addSelect(
							`SUM(CASE WHEN reaction.type = 'smile' THEN 1 ELSE 0 END)`,
							"smile_count",
						)
						.addSelect(
							`SUM(CASE WHEN reaction.type = 'angry' THEN 1 ELSE 0 END)`,
							"angry_count",
						)
						.addSelect(
							`SUM(CASE WHEN reaction.type = 'sad' THEN 1 ELSE 0 END)`,
							"sad_count",
						)
						.addSelect(
							`SUM(CASE WHEN reaction.type = 'love' THEN 1 ELSE 0 END)`,
							"love_count",
						)
						.from("reaction", "reaction")
						.groupBy('reaction."postId"'),
				"reactions_counts",
				'reactions_counts."postId" = post.id',
			)
			// Left join the comments_counts subquery
			.leftJoin(
				(qb) =>
					qb
						.select('comment."postId"', "postId")
						.addSelect("COUNT(comment.id)", "comments_count")
						.from("comment", "comment")
						.groupBy('comment."postId"'),
				"comments_counts",
				'comments_counts."postId" = post.id',
			)
			.select([
				'post.id AS "post_id"',
				'post.content AS "post_content"',
				'post."createdAt" AS "post_createdAt"',
				'post."updatedAt" AS "post_updatedAt"',
				'post."pinnedCommentId" AS "post_pinnedCommentId"',
				'creator.id AS "creator_id"',
				'creator.username AS "creator_username"',
				'creator."firstName" AS "creator_firstName"',
				'creator."lastName" AS "creator_lastName"',
				'interest.id AS "interest_id"',
				'interest.name AS "interest_name"',
				'COALESCE(reactions_counts.like_count, 0) AS "like_count"',
				'COALESCE(reactions_counts.dislike_count, 0) AS "dislike_count"',
				'COALESCE(reactions_counts.smile_count, 0) AS "smile_count"',
				'COALESCE(reactions_counts.angry_count, 0) AS "angry_count"',
				'COALESCE(reactions_counts.sad_count, 0) AS "sad_count"',
				'COALESCE(reactions_counts.love_count, 0) AS "love_count"',
				'COALESCE(comments_counts.comments_count, 0) AS "comments_count"',
			])
			.orderBy('post."createdAt"', "DESC")
			.offset(skip)
			.limit(limit);

		// Execute the query
		const postsWithCounts = await qb.getRawMany();

		// Map and parse each post’s counts and details
		const postDetails = postsWithCounts.map((postWithCounts) => {
			// Manually construct the PostDetail object
			const postDetail = new PostDetail();

			// Assign basic fields
			postDetail.id = postWithCounts.post_id;
			postDetail.content = postWithCounts.post_content;
			postDetail.createdAt = postWithCounts.post_createdAt;
			postDetail.updatedAt = postWithCounts.post_updatedAt;
			postDetail.isPinned = !!postWithCounts.post_pinnedCommentId;

			// Assign creator fields
			const creator = new UserDetail();
			creator.id = postWithCounts.creator_id;
			creator.username = postWithCounts.creator_username;
			creator.firstName = postWithCounts.creator_firstName;
			creator.lastName = postWithCounts.creator_lastName;

			postDetail.creator = creator;

			// Assign counts
			postDetail.commentsCount = parseInt(postWithCounts.comments_count || "0", 10);

			// Assign interest fields
			const interestId = postWithCounts.interest_id;
			const interestName = postWithCounts.interest_name;

			if (interestId && interestName) {
				const interestDetail = new InterestDetail();
				interestDetail.id = interestId;
				interestDetail.name = interestName;
				postDetail.interest = interestDetail;
			}

			// Assign reactions counts
			const reactionsCount = new ReactionsCount();
			reactionsCount.like = parseInt(postWithCounts.like_count || "0", 10);
			reactionsCount.dislike = parseInt(postWithCounts.dislike_count || "0", 10);
			reactionsCount.smile = parseInt(postWithCounts.smile_count || "0", 10);
			reactionsCount.angry = parseInt(postWithCounts.angry_count || "0", 10);
			reactionsCount.sad = parseInt(postWithCounts.sad_count || "0", 10);
			reactionsCount.love = parseInt(postWithCounts.love_count || "0", 10);
			postDetail.reactions = reactionsCount;

			return postDetail;
		});

		// Calculate total posts for pagination
		const total = await this.entityManager.count("post");
		return new PaginatedPostsListResponse(postDetails, total, page, limit);
	}
}
