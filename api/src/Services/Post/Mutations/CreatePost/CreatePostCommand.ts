import { Post } from "@Models/Post";
import { User } from "@Models/User";
import GenericResponse from "@Utils/Http/GenericResponse.type";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { validate } from "class-validator";
import { EntityManager } from "typeorm";

import CreatePostDto from "./CreatePost.dto";

export class CreatePostCommand {
	constructor(
		public createPostDto: CreatePostDto,
		public creatorId: string,
	) {}
}
@CommandHandler(CreatePostCommand)
export class CreatePostCommandHandler implements ICommandHandler<CreatePostCommand> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(command: CreatePostCommand): Promise<GenericResponse> {
		const { createPostDto, creatorId } = command;

		const errors = await validate(createPostDto);
		if (errors.length > 0) {
			throw new ConflictException(
				`Validation failed: ${errors.map((error) => error.toString()).join(", ")}`,
			);
		}

		const post = this.mapper.map(createPostDto, CreatePostDto, Post);

		try {
			const creator = await this.entityManager.findOne(User, { where: { id: creatorId } });
			if (!creator) {
				throw new ConflictException("Creator does not exist.");
			}

			post.creator = creator;

			await this.entityManager.save(Post, post);
			return new GenericResponse("Post created successfully", this.constructor.name);
		} catch (error) {
			throw new InternalServerErrorException("Something went wrong. Please try again.");
		}
	}
}
