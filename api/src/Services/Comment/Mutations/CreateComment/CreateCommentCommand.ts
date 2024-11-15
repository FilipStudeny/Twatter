import { Comment } from "@Models/Comment";
import { Post } from "@Models/Post";
import { User } from "@Models/User";
import GenericResponse from "@Shared/Response/GenericResponse";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { ConflictException, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { validate } from "class-validator";
import { EntityManager } from "typeorm";

import CreateCommentDto from "./CreateComment.dto";

export class CreateCommentCommand {
	constructor(
		public readonly createCommentDto: CreateCommentDto,
		public readonly userId: string,
		public readonly postId: string,
	) {}
}

@CommandHandler(CreateCommentCommand)
export class CreateCommentCommandHandler implements ICommandHandler<CreateCommentCommand> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(command: CreateCommentCommand): Promise<GenericResponse> {
		const { createCommentDto, userId, postId } = command;
		const { content } = createCommentDto;

		const errors = await validate(createCommentDto);
		if (errors.length > 0) {
			throw new ConflictException(
				`Validation failed: ${errors.map((error) => error.toString()).join(", ")}`,
			);
		}

		const user = await this.entityManager.findOne(User, {
			where: { id: userId },
			relations: ["comments"],
		});
		if (!user) {
			throw new NotFoundException("User not found");
		}

		const post = await this.entityManager.findOne(Post, {
			where: { id: postId },
			relations: ["comments"],
		});
		if (!post) {
			throw new NotFoundException("Post not found");
		}

		const comment = new Comment();
		comment.content = content;
		comment.creator = user;
		comment.post = post;

		try {
			await this.entityManager.save(Comment, comment);

			post.comments.push(comment);
			await this.entityManager.save(Post, post);
			return new GenericResponse("Comment added successfully");
		} catch {
			throw new InternalServerErrorException("Something went wrong. Please try again.");
		}
	}
}
