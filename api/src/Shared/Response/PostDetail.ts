import { DbResponse } from "@Shared/DbResponse";
import { ReactionsCount } from "@Shared/Response/ReactionsCount";
import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { Field, Int, ObjectType } from "@nestjs/graphql";

import { CommentDetail } from "./CommentDetail";
import { GroupDetail } from "./GroupDetail";
import { InterestDetail } from "./InterestDetail";
import UserDetail from "./UserDetail";

@ObjectType()
export class PostDetail {
	@Field()
	id: string;

	@Field()
	content: string;

	@Field(() => String, { nullable: true })
	postPicture: string;

	@Field(() => UserDetail)
	creator: UserDetail;

	@Field(() => Int, { nullable: true })
	commentsCount: number;

	@Field(() => ReactionsCount, { nullable: true })
	reactions: ReactionsCount;

	@Field({ nullable: true })
	createdAt: Date;

	@Field({ nullable: true })
	updatedAt: Date;

	@Field(() => InterestDetail, { nullable: true })
	interest?: InterestDetail;

	@Field(() => GroupDetail, { nullable: true })
	group?: GroupDetail;

	@Field(() => Int, { nullable: true })
	reportsCount: number;

	@Field(() => Int, { nullable: true })
	strikesCount: number;

	@Field(() => CommentDetail, { nullable: true })
	pinnedComment?: CommentDetail;

	@Field(() => Boolean, { nullable: true })
	isPinned: boolean;

	static createMap(mapper: Mapper): void {
		createMap(
			mapper,
			DbResponse,
			PostDetail,
			forMember(
				(destination) => destination.id,
				mapFrom((source) => source.post_id),
			),
			forMember(
				(destination) => destination.content,
				mapFrom((source) => source.post_content),
			),
			forMember(
				(destination) => destination.postPicture,
				mapFrom((source) => source.post_postPicture),
			),
			forMember(
				(destination) => destination.createdAt,
				mapFrom((source) => source.post_createdAt),
			),
			forMember(
				(destination) => destination.updatedAt,
				mapFrom((source) => source.post_updatedAt),
			),
			forMember(
				(destination) => destination.isPinned,
				mapFrom((source) => !!source.post_pinnedCommentId),
			),

			// Map creator
			forMember(
				(destination) => destination.creator,
				mapFrom(
					(source) =>
						({
							id: source.creator_id,
							username: source.creator_username,
							firstName: source.creator_firstName,
							lastName: source.creator_lastName,
							profilePictureUrl: source.creator_profilePictureUrl,
						}) as UserDetail,
				),
			),

			// Map interest
			forMember(
				(destination) => destination.interest,
				mapFrom((source) =>
					source.interest_id
						? ({
								id: source.interest_id,
								name: source.interest_name,
							} as InterestDetail)
						: undefined,
				),
			),

			// Map reactions
			forMember(
				(destination) => destination.reactions,
				mapFrom(
					(source) =>
						({
							like: parseInt(source.like_count || "0", 10),
							dislike: parseInt(source.dislike_count || "0", 10),
							smile: parseInt(source.smile_count || "0", 10),
							angry: parseInt(source.angry_count || "0", 10),
							sad: parseInt(source.sad_count || "0", 10),
							love: parseInt(source.love_count || "0", 10),
						}) as ReactionsCount,
				),
			),

			// Map pinned comment
			forMember(
				(destination) => destination.pinnedComment,
				mapFrom((source) =>
					source.pinnedComment_id
						? ({
								id: source.pinnedComment_id,
								content: source.pinnedComment_content,
								creator: {
									id: source.pinnedComment_creator_id,
									username: source.pinnedComment_creator_username,
								} as UserDetail,
							} as CommentDetail)
						: undefined,
				),
			),

			// Map group
			forMember(
				(destination) => destination.group,
				mapFrom((source) =>
					source.group_id
						? ({
								id: source.group_id,
								name: source.group_name,
							} as GroupDetail)
						: undefined,
				),
			),

			// Map counts
			forMember(
				(destination) => destination.commentsCount,
				mapFrom((source) => parseInt(source.comments_count || "0", 10)),
			),
			forMember(
				(destination) => destination.reportsCount,
				mapFrom((source) => parseInt(source.reports_count || "0", 10)),
			),
			forMember(
				(destination) => destination.strikesCount,
				mapFrom((source) => parseInt(source.strikes_count || "0", 10)),
			),
		);
	}
}
