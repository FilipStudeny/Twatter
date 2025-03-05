import { Group } from "@Models/Group";
import { Interest } from "@Models/Interest";
import { Post } from "@Models/Post";
import { User } from "@Models/User";
import GenericResponse from "@Shared/Response/GenericResponse";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { validate } from "class-validator";
import { EntityManager } from "typeorm";

import { CreatePostDto } from "./CreatePost.dto";

export class CreatePostCommand {
	constructor(
		public readonly createPostDto: CreatePostDto,
		public readonly userId: string,
	) {}
}

@CommandHandler(CreatePostCommand)
export class CreatePostCommandHandler implements ICommandHandler<CreatePostCommand> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(command: CreatePostCommand): Promise<GenericResponse> {
		const { createPostDto, userId } = command;
		const { content, interestId, groupId } = createPostDto;

		const errors = await validate(createPostDto);
		if (errors.length > 0) {
			throw new ConflictException(
				`Validation failed: ${errors.map((error) => error.toString()).join(", ")}`,
			);
		}

		const user = await this.entityManager.findOne(User, {
			where: { id: userId },
			relations: ["posts"],
		});
		if (!user) {
			throw new NotFoundException("User not found");
		}

		if (interestId) {
			const interestExists = await this.entityManager.findOne(Interest, {
				where: { id: interestId },
				select: ["id"],
			});
			if (!interestExists) {
				throw new NotFoundException("Interest not found");
			}
		}

		if (groupId) {
			const groupExists = await this.entityManager.findOne(Group, {
				where: { id: groupId },
				select: ["id"],
			});
			if (!groupExists) {
				throw new NotFoundException("Group not found");
			}
		}

		const post = new Post();
		post.content = content;
		post.creator = { id: userId } as User;
		if (interestId) {
			post.interest = { id: interestId } as Interest;
		}
		if (groupId) {
			post.group = { id: groupId } as Group;
		}

		try {
			await this.entityManager.save(Post, post);

			user.posts.push(post);
			await this.entityManager.save(User, user);
			return new GenericResponse(post.id);
		} catch (error) {
			if (error.code === "23503") {
				throw new NotFoundException("Invalid foreign key provided.");
			}
			throw new InternalServerErrorException("Something went wrong. Please try again.");
		}
	}
}
