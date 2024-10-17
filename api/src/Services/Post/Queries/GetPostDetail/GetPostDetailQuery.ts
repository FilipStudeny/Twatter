import { Comment } from "@Models/Comment";
import ReactionType from "@Models/Enums/ReactionType";
import { Post } from "@Models/Post";
import { Reaction } from "@Models/Reaction";
import { NotFoundException } from "@nestjs/common";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

import { PostDetailDto } from "./PostDetail.dto";
import { ReactionsCountDto } from "./ReactionsCount.dto";

export class GetPostDetailQuery {
	constructor(public readonly postId: string) {}
}

@QueryHandler(GetPostDetailQuery)
export class GetPostDetailQueryHandler implements IQueryHandler<GetPostDetailQuery> {
	constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

	// ... previous imports and setup

	async execute(query: GetPostDetailQuery): Promise<PostDetailDto> {
		const { postId } = query;

		// Fetch the post with counts using subqueries in the SELECT clause
		const postWithCounts = await this.entityManager
			.createQueryBuilder(Post, "post")
			.leftJoinAndSelect("post.creator", "creator")
			.addSelect(["creator.id", "creator.username", "creator.firstName", "creator.lastName"])
			.addSelect(
				(subQuery) =>
					subQuery
						.select("COUNT(comment.id)")
						.from(Comment, "comment")
						.where('comment."postId" = post.id'),
				"comments_count",
			)
			.addSelect(
				(subQuery) =>
					subQuery
						.select(
							"COALESCE(CAST(JSON_AGG(JSON_BUILD_OBJECT('type', rc.type, 'count', rc.count)) AS TEXT), '[]')",
						)
						.from(
							(qb) =>
								qb
									.select("reaction.type", "type")
									.addSelect("COUNT(reaction.id)", "count")
									.from(Reaction, "reaction")
									.where('reaction."postId" = post.id')
									.groupBy("reaction.type"),
							"rc",
						),
				"reactions_counts",
			)
			.where("post.id = :postId", { postId })
			.getRawOne();

		if (!postWithCounts) {
			throw new NotFoundException("Post not found");
		}

		// Extract post fields
		const postEntity = {
			id: postWithCounts.post_id,
			content: postWithCounts.post_content,
			createdAt: postWithCounts.post_createdAt,
			updatedAt: postWithCounts.post_updatedAt,
		} as Post;

		// Extract creator information
		const creatorId = postWithCounts.creator_id;
		const creatorName = postWithCounts.creator_username?.trim()
			? postWithCounts.creator_username
			: `${postWithCounts.creator_firstName} ${postWithCounts.creator_lastName}`;

		// Extract comments count
		const commentsCount = parseInt(postWithCounts.comments_count || "0", 10);

		// Extract reactions counts
		let reactionsCountsArray = [];
		if (postWithCounts.reactions_counts) {
			try {
				reactionsCountsArray = JSON.parse(postWithCounts.reactions_counts);
			} catch (error) {
				console.error("Failed to parse reactions_counts:", error);
				reactionsCountsArray = [];
			}
		}

		// Build the ReactionsCountDto
		const reactionsCountDto = new ReactionsCountDto();

		reactionsCountsArray.forEach((rc: { type: ReactionType; count: string }) => {
			const { type } = rc;
			const count = parseInt(rc.count, 10);

			if (type === ReactionType.LIKE) {
				reactionsCountDto.like = count;
			} else if (type === ReactionType.DISLIKE) {
				reactionsCountDto.dislike = count;
			} else if (type === ReactionType.SMILE) {
				reactionsCountDto.smile = count;
			} else if (type === ReactionType.ANGRY) {
				reactionsCountDto.angry = count;
			} else if (type === ReactionType.SAD) {
				reactionsCountDto.sad = count;
			} else if (type === ReactionType.LOVE) {
				reactionsCountDto.love = count;
			}
		});

		// Return the PostDetailDto with the computed values
		return new PostDetailDto(postEntity, creatorName, creatorId, commentsCount, reactionsCountDto);
	}
}
