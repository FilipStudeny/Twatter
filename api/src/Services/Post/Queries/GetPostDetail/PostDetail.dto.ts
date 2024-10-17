import { Post } from "@Models/Post";
import { Field, Int, ObjectType } from "@nestjs/graphql";

import { ReactionsCountDto } from "./ReactionsCount.dto";

@ObjectType()
export class PostDetailDto {
	constructor(
		post: Post,
		creatorName: string,
		creatorId: string,
		commentsCount: number,
		reactionsCount: ReactionsCountDto,
	) {
		this.id = post.id;
		this.content = post.content;
		this.creatorName = creatorName;
		this.creatorId = creatorId;
		this.commentsCount = commentsCount;
		this.reactions = reactionsCount;
		this.createdAt = post.createdAt;
		this.updatedAt = post.updatedAt;
	}

	@Field()
	id: string;

	@Field()
	content: string;

	@Field()
	creatorName: string;

	@Field()
	creatorId: string;

	@Field(() => Int)
	commentsCount: number;

	@Field(() => ReactionsCountDto)
	reactions: ReactionsCountDto;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}
