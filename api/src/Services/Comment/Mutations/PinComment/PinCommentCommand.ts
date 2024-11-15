import { Comment } from "@Models/Comment";
import { Post } from "@Models/Post";
import GenericResponse from "@Shared/Response/GenericResponse";
import { NotFoundException, ForbiddenException, InternalServerErrorException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

export class PinCommentCommand {
	constructor(
		public readonly postId: string,
		public readonly commentId: string,
		public readonly userId: string,
	) {}
}

@CommandHandler(PinCommentCommand)
export class PinCommentCommandHandler implements ICommandHandler<PinCommentCommand> {
	constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

	async execute(command: PinCommentCommand): Promise<GenericResponse> {
		const { postId, commentId, userId } = command;

		const post = await this.entityManager.findOne(Post, {
			where: { id: postId },
			relations: ["creator", "pinnedComment"],
		});
		if (!post) {
			throw new NotFoundException("Post not found");
		}

		if (post.creator.id !== userId) {
			throw new ForbiddenException("You are not allowed to pin a comment on this post");
		}

		const comment = await this.entityManager.findOne(Comment, {
			where: { id: commentId, post: { id: postId } },
		});
		if (!comment) {
			throw new NotFoundException("Comment not found or does not belong to the post");
		}

		post.pinnedComment = comment;

		try {
			await this.entityManager.save(Post, post);
			return new GenericResponse("Comment pinned successfully");
		} catch {
			throw new InternalServerErrorException("Something went wrong. Please try again.");
		}
	}
}
