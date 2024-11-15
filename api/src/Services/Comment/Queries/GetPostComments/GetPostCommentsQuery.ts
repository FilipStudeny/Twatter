import { Comment } from "@Models/Comment";
import CommentListItemDto from "@Services/Comment/Shared/Comment.dto";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

import PaginatedCommentsResponse from "./PaginatedCommentsResult";

export class GetPostCommentsQuery {
	constructor(
		public readonly postId: string,
		public readonly page: number,
		public readonly limit: number,
	) {}
}

@QueryHandler(GetPostCommentsQuery)
export default class GetPostCommentsQueryHandler implements IQueryHandler<GetPostCommentsQuery> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(query: GetPostCommentsQuery): Promise<PaginatedCommentsResponse> {
		const { postId, page, limit } = query;
		const skip = (page - 1) * limit;

		const [comments, total] = await this.entityManager.findAndCount(Comment, {
			where: { post: { id: postId } },
			relations: ["creator"],
			skip,
			take: limit,
			order: { createdAt: "DESC" },
		});

		const commentDtos = this.mapper.mapArray(comments, Comment, CommentListItemDto);

		return new PaginatedCommentsResponse(commentDtos, total, page, limit);
	}
}
