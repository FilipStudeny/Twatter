import { Post } from "@Models/Post";
import { PostDetail } from "@Shared/Response/PostDetail";
import { ReactionsCount } from "@Shared/Response/ReactionsCount";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { NotFoundException } from "@nestjs/common";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import UserDetail from "@Shared/Response/UserDetail";
import { InterestDetail } from "@Shared/Response/InterestDetail";

export class GetPostDetailQuery {
	constructor(public readonly postId: string) {}
}

@QueryHandler(GetPostDetailQuery)
export class GetPostDetailQueryHandler implements IQueryHandler<GetPostDetailQuery> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(query: GetPostDetailQuery): Promise<PostDetail> {
		const { postId } = query;

		const postWithCounts = await this.entityManager
			.createQueryBuilder(Post, "post")
			.leftJoin("post.creator", "creator")
			.leftJoin("post.interest", "interest")
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
						.where('reaction."postId" = :postId', { postId })
						.groupBy('reaction."postId"'),
				"reactions_counts",
				'reactions_counts."postId" = post.id',
			)
			.leftJoin(
				(qb) =>
					qb
						.select('comment."postId"', "postId")
						.addSelect("COUNT(comment.id)", "comments_count")
						.from("comment", "comment")
						.where('comment."postId" = :postId', { postId })
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
			.where("post.id = :postId", { postId })
			.getRawOne();

		if (!postWithCounts) {
			throw new NotFoundException("Post not found");
		}

		// Build the PostDetail response
		const postDetail = new PostDetail();
		postDetail.id = postWithCounts.post_id;
		postDetail.content = postWithCounts.post_content;
		postDetail.createdAt = postWithCounts.post_createdAt;
		postDetail.updatedAt = postWithCounts.post_updatedAt;
		postDetail.isPinned = !!postWithCounts.post_pinnedCommentId;

		// Assign creator details
		const creator = new UserDetail();
		creator.id = postWithCounts.creator_id;
		creator.username = postWithCounts.creator_username;
		creator.firstName = postWithCounts.creator_firstName;
		creator.lastName = postWithCounts.creator_lastName;
		postDetail.creator = creator;

		// Assign interest details if available
		if (postWithCounts.interest_id && postWithCounts.interest_name) {
			const interest = new InterestDetail();
			interest.id = postWithCounts.interest_id;
			interest.name = postWithCounts.interest_name;
			postDetail.interest = interest;
		}

		// Assign comments count
		postDetail.commentsCount = parseInt(postWithCounts.comments_count || "0", 10);

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
	}
}
