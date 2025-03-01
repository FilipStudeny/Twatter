import { Comment } from "@Models/Comment";
import { Post } from "@Models/Post";
import { User } from "@Models/User";
import GenericResponse from "@Shared/Response/GenericResponse";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Logger, BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { validate } from "class-validator";
import { EntityManager } from "typeorm";

import CreateCommentDto from "./CreateComment.dto";

export class CreateCommentCommand {
	constructor(
		public readonly createCommentDto: CreateCommentDto,
		public readonly authenticatedUser: string,
	) {}
}

@CommandHandler(CreateCommentCommand)
export class CreateCommentCommandHandler implements ICommandHandler<CreateCommentCommand> {
	private readonly logger = new Logger(CreateCommentCommandHandler.name);

	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(command: CreateCommentCommand): Promise<GenericResponse> {
		const { createCommentDto, authenticatedUser } = command;
		const { content, postId } = createCommentDto;

		this.logger.debug("Started execution of CreateCommentCommand");
		this.logger.debug(`Authenticated user ID: ${authenticatedUser}`);
		this.logger.debug(`CreateCommentDto: ${JSON.stringify(createCommentDto)}`);

		const errors = await validate(createCommentDto);
		if (errors.length > 0) {
			const messages = errors.map((e) => Object.values(e.constraints || {}).join(", ")).join("; ");
			this.logger.warn(`Validation failed: ${messages}`);
			throw new BadRequestException(`Validation failed: ${messages}`);
		}

		this.logger.debug("Querying for user...");
		const user = await this.entityManager.findOne(User, {
			where: { id: authenticatedUser },
		});
		if (!user) {
			this.logger.error(`User not found with ID: ${authenticatedUser}`);
			throw new NotFoundException("User not found");
		}

		this.logger.debug(`Querying for post with ID: ${postId}`);
		const post = await this.entityManager.findOne(Post, {
			where: { id: postId },
		});
		if (!post) {
			this.logger.error(`Post not found with ID: ${postId}`);
			throw new NotFoundException("Post not found");
		}

		const comment = this.entityManager.create(Comment, {
			content,
			creator: user,
			post,
		});

		try {
			this.logger.debug("Saving new comment...");
			await this.entityManager.save(comment);
			this.logger.log(`Comment added successfully. Comment ID: ${comment.id}`);

			return new GenericResponse("Comment added successfully");
		} catch (error) {
			this.logger.error("Failed to save comment", error?.stack || error);
			throw new InternalServerErrorException("Something went wrong. Please try again.");
		}
	}
}
