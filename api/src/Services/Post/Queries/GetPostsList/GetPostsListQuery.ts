import { CommentDetail } from "@Shared/Response/CommentDetail";
import { GroupDetail } from "@Shared/Response/GroupDetail";
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
		public readonly requestedFields: PostDetail,
	) {}
}

@QueryHandler(GetPostsListQuery)
export class GetPostsListQueryHandler implements IQueryHandler<GetPostsListQuery> {
	constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

	async execute(query: GetPostsListQuery): Promise<PaginatedPostsListResponse> {
		const { page, limit, requestedFields } = query;
		const skip = (page - 1) * limit;

		const qb = this.entityManager.createQueryBuilder("post", "post");

		qb.select(['post.id AS "post_id"']);

		if (requestedFields.content) {
			qb.addSelect('post.content AS "post_content"');
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

		// Handle 'reactions' fields without subquery
		if (requestedFields.reactions) {
			qb.leftJoin("post.reactions", "reaction");
			const reactionsFields = [];

			// Prepare conditional aggregates for each reaction type
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

		if (requestedFields.pinnedComment) {
			qb.leftJoin("post.pinnedComment", "pinnedComment");
			const pinnedCommentFields = [];
			if (requestedFields.pinnedComment.id) {
				pinnedCommentFields.push('pinnedComment.id AS "pinnedComment_id"');
			}
			if (requestedFields.pinnedComment.content) {
				pinnedCommentFields.push('pinnedComment.content AS "pinnedComment_content"');
			}

			if (requestedFields.pinnedComment.creator) {
				qb.leftJoin("pinnedComment.creator", "pinnedCommentCreator");
				if (requestedFields.pinnedComment.creator.id) {
					pinnedCommentFields.push(
						'pinnedCommentCreator.id AS "pinnedComment_creator_id"',
					);
				}
				if (requestedFields.pinnedComment.creator.username) {
					pinnedCommentFields.push(
						'pinnedCommentCreator.username AS "pinnedComment_creator_username"',
					);
				}
			}

			if (pinnedCommentFields.length > 0) {
				qb.addSelect(pinnedCommentFields);
			}
		}

		if (requestedFields.reportsCount) {
			qb.leftJoin("post.reports", "reports");
			qb.addSelect('COUNT(DISTINCT reports.id) AS "reports_count"');
		}

		if (requestedFields.strikesCount) {
			qb.leftJoin("post.strikes", "strikes");
			qb.addSelect('COUNT(DISTINCT strikes.id) AS "strikes_count"');
		}

		qb.addSelect('COUNT(*) OVER() AS "total_count"');

		const groupByFields = ["post.id"];

		if (requestedFields.content) {
			groupByFields.push("post.content");
		}
		if (requestedFields.createdAt) {
			groupByFields.push('post."createdAt"');
		}
		if (requestedFields.updatedAt) {
			groupByFields.push('post."updatedAt"');
		}
		if (requestedFields.isPinned) {
			groupByFields.push('post."pinnedCommentId"');
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
		if (requestedFields.interest) {
			if (requestedFields.interest.id) {
				groupByFields.push("interest.id");
			}
			if (requestedFields.interest.name) {
				groupByFields.push("interest.name");
			}
		}
		if (requestedFields.group) {
			if (requestedFields.group.id) {
				groupByFields.push("group.id");
			}
			if (requestedFields.group.name) {
				groupByFields.push("group.name");
			}
		}
		if (requestedFields.pinnedComment) {
			if (requestedFields.pinnedComment.id) {
				groupByFields.push("pinnedComment.id");
			}
			if (requestedFields.pinnedComment.content) {
				groupByFields.push("pinnedComment.content");
			}
			if (requestedFields.pinnedComment.creator) {
				if (requestedFields.pinnedComment.id) {
					groupByFields.push("pinnedCommentCreator.id");
				}
				if (requestedFields.pinnedComment.creator.username) {
					groupByFields.push("pinnedCommentCreator.username");
				}
			}
		}

		qb.groupBy(groupByFields.join(", "));
		qb.orderBy('post."createdAt"', "DESC");
		qb.offset(skip).limit(limit);

		const postsWithCounts = await qb.getRawMany();

		// Extract total count from the first row (since it's the same for all)
		const total = postsWithCounts.length > 0 ? parseInt(postsWithCounts[0].total_count, 10) : 0;

		const postDetails = postsWithCounts.map((postWithCounts) => {
			const postDetail = new PostDetail();

			postDetail.id = postWithCounts.post_id;

			if (requestedFields.content) {
				postDetail.content = postWithCounts.post_content;
			}

			if (requestedFields.createdAt) {
				postDetail.createdAt = postWithCounts.post_createdAt;
			}

			if (requestedFields.updatedAt) {
				postDetail.updatedAt = postWithCounts.post_updatedAt;
			}

			if (requestedFields.isPinned) {
				postDetail.isPinned = !!postWithCounts.post_pinnedCommentId;
			}

			if (requestedFields.creator) {
				const creator = new UserDetail();
				if (requestedFields.creator.id) {
					creator.id = postWithCounts.creator_id;
				}
				if (requestedFields.creator.username) {
					creator.username = postWithCounts.creator_username;
				}
				if (requestedFields.creator.firstName) {
					creator.firstName = postWithCounts.creator_firstName;
				}
				if (requestedFields.creator.lastName) {
					creator.lastName = postWithCounts.creator_lastName;
				}
				postDetail.creator = creator;
			}

			if (requestedFields.interest && postWithCounts.interest_id) {
				const interest = new InterestDetail();
				if (requestedFields.interest.id) {
					interest.id = postWithCounts.interest_id;
				}
				if (requestedFields.interest.name) {
					interest.name = postWithCounts.interest_name;
				}
				postDetail.interest = interest;
			}

			if (requestedFields.reactions) {
				const reactionsCount = new ReactionsCount();
				if (requestedFields.reactions.like) {
					reactionsCount.like = parseInt(postWithCounts.like_count || "0", 10);
				}
				if (requestedFields.reactions.dislike) {
					reactionsCount.dislike = parseInt(postWithCounts.dislike_count || "0", 10);
				}
				if (requestedFields.reactions.smile) {
					reactionsCount.smile = parseInt(postWithCounts.smile_count || "0", 10);
				}
				if (requestedFields.reactions.angry) {
					reactionsCount.angry = parseInt(postWithCounts.angry_count || "0", 10);
				}
				if (requestedFields.reactions.sad) {
					reactionsCount.sad = parseInt(postWithCounts.sad_count || "0", 10);
				}
				if (requestedFields.reactions.love) {
					reactionsCount.love = parseInt(postWithCounts.love_count || "0", 10);
				}
				postDetail.reactions = reactionsCount;
			}

			if (requestedFields.commentsCount) {
				postDetail.commentsCount = parseInt(postWithCounts.comments_count || "0", 10);
			}

			if (requestedFields.group && postWithCounts.group_id) {
				const group = new GroupDetail();
				if (requestedFields.group.id) {
					group.id = postWithCounts.group_id;
				}
				if (requestedFields.group.name) {
					group.name = postWithCounts.group_name;
				}
				postDetail.group = group;
			}

			if (requestedFields.pinnedComment && postWithCounts.pinnedComment_id) {
				const pinnedComment = new CommentDetail();
				if (requestedFields.pinnedComment.id) {
					pinnedComment.id = postWithCounts.pinnedComment_id;
				}
				if (requestedFields.pinnedComment.content) {
					pinnedComment.content = postWithCounts.pinnedComment_content;
				}

				if (requestedFields.pinnedComment.creator) {
					const pinnedCommentCreator = new UserDetail();
					if (requestedFields.pinnedComment.creator.id) {
						pinnedCommentCreator.id = postWithCounts.pinnedComment_creator_id;
					}
					if (requestedFields.pinnedComment.creator.username) {
						pinnedCommentCreator.username =
							postWithCounts.pinnedComment_creator_username;
					}
					pinnedComment.creator = pinnedCommentCreator;
				}

				postDetail.pinnedComment = pinnedComment;
			}

			if (requestedFields.reportsCount) {
				postDetail.reportsCount = parseInt(postWithCounts.reports_count || "0", 10);
			}

			if (requestedFields.strikesCount) {
				postDetail.strikesCount = parseInt(postWithCounts.strikes_count || "0", 10);
			}

			return postDetail;
		});

		return new PaginatedPostsListResponse(postDetails, total, page, limit);
	}
}
