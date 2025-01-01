import { DbResponse } from "@Shared/DbResponse";
import { ReactionsCount } from "@Shared/Response/ReactionsCount";
import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { Field, ObjectType } from "@nestjs/graphql";

import UserDetail from "./UserDetail";

@ObjectType()
export class CommentDetail {
	@Field()
	id: string;

	@Field()
	content: string;

	@Field(() => UserDetail)
	creator: UserDetail;

	@Field()
	postId: string;

	@Field(() => ReactionsCount, { nullable: true })
	reactions: ReactionsCount;

	@Field({ nullable: true })
	reportsCount: number;

	@Field({ nullable: true })
	strikesCount: number;

	@Field({ nullable: true })
	createdAt: Date;

	@Field({ nullable: true })
	updatedAt: Date;

	static createMap(mapper: Mapper): void {
		createMap(
			mapper,
			DbResponse,
			CommentDetail,
			forMember(
				(destination) => destination.id,
				mapFrom((source) => source.comment_id),
			),
			forMember(
				(destination) => destination.postId,
				mapFrom((source) => source.post_id),
			),
			forMember(
				(destination) => destination.createdAt,
				mapFrom((source) => source.comment_createdat),
			),
			forMember(
				(destination) => destination.postId,
				mapFrom((source) => source.comment_post_id),
			),
			forMember(
				(destination) => destination.content,
				mapFrom((source) => source.comment_content),
			),
			forMember(
				(destination) => destination.createdAt,
				mapFrom((source) => source.comment_createdAt),
			),
			forMember(
				(destination) => destination.updatedAt,
				mapFrom((source) => source.comment_updatedAt),
			),
			forMember(
				(destination) => destination.creator,
				mapFrom(
					(source) =>
						({
							id: source.creator_id,
							username: source.creator_username,
							firstName: source.creator_firstName,
							lastName: source.creator_lastName,
						}) as UserDetail,
				),
			),
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
