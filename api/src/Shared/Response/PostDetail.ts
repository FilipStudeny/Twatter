import { Post } from "@Models/Post";
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

	@Field(() => UserDetail)
	creator: UserDetail;

	@Field(() => Int, { nullable: true })
	commentsCount: number;

	@Field(() => ReactionsCount, { nullable: true })
	reactions: ReactionsCount;

	@Field()
	createdAt: Date;

	@Field()
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

	constructor(
		id?: string,
		content?: string,
		creator?: UserDetail,
		commentsCount?: number,
		reactions?: ReactionsCount,
		createdAt?: Date,
		updatedAt?: Date,
		interest?: InterestDetail,
		group?: GroupDetail,
		reportsCount?: number,
		strikesCount?: number,
		pinnedComment?: CommentDetail,
		isPinned?: boolean,
	) {
		this.id = id;
		this.content = content;
		this.creator = creator;
		this.commentsCount = commentsCount;
		this.reactions = reactions;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.interest = interest;
		this.group = group;
		this.reportsCount = reportsCount;
		this.strikesCount = strikesCount;
		this.pinnedComment = pinnedComment;
		this.isPinned = isPinned;
	}

	static createMap(mapper: Mapper): void {
		createMap(
			mapper,
			Post,
			PostDetail,
			// Map standard fields
			forMember(
				(destination) => destination.id,
				mapFrom((source) => source.id),
			),
			forMember(
				(destination) => destination.content,
				mapFrom((source) => source.content),
			),
			forMember(
				(destination) => destination.createdAt,
				mapFrom((source) => source.createdAt),
			),
			forMember(
				(destination) => destination.updatedAt,
				mapFrom((source) => source.updatedAt),
			),
			forMember(
				(destination) => destination.isPinned,
				mapFrom((source) => !!source.pinnedComment),
			),

			// Map counts, handling possible undefined arrays
			forMember(
				(destination) => destination.commentsCount,
				mapFrom((source) => source.comments?.length ?? 0),
			),
			forMember(
				(destination) => destination.reportsCount,
				mapFrom((source) => source.reports?.length ?? 0),
			),
			forMember(
				(destination) => destination.strikesCount,
				mapFrom((source) => source.strikes?.length ?? 0),
			),
		);
	}
}
