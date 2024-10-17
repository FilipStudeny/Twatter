import { Comment } from "@Models/Comment";
import ReactionTargetType from "@Models/Enums/ReactionTarget";
import { Post } from "@Models/Post";
import { Reaction } from "@Models/Reaction";
import { User } from "@Models/User";
import GenericResponse from "@Utils/Http/GenericResponse.type";
import { NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

import { CreateOrUpdateReactionDto } from "./CreateReaction.dto";

export class CreateOrUpdateReactionCommand {
	constructor(
		public readonly userId: string,
		public readonly reactionData: CreateOrUpdateReactionDto,
	) {}
}

@CommandHandler(CreateOrUpdateReactionCommand)
export class CreateOrUpdateReactionCommandHandler implements ICommandHandler<CreateOrUpdateReactionCommand> {
	constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

	async execute(command: CreateOrUpdateReactionCommand): Promise<GenericResponse> {
		const { reactionData, userId } = command;
		const { reactionType, targetId, targetType } = reactionData;

		// Retrieve the user who is reacting
		const user = await this.entityManager.findOne(User, { where: { id: userId } });
		if (!user) {
			throw new NotFoundException("User not found");
		}

		let reaction: Reaction | undefined;

		if (targetType === ReactionTargetType.POST) {
			const post = await this.entityManager.findOne(Post, {
				where: { id: targetId },
				relations: ["reactions"],
			});
			if (!post) {
				throw new NotFoundException("Post not found");
			}

			// Check if the user has already reacted to this post
			reaction = await this.entityManager.findOne(Reaction, {
				where: { user: { id: userId }, post: { id: targetId } },
			});

			if (reaction && reaction.type === reactionType) {
				return new GenericResponse(
					"You have already reacted with this type to this post.",
					this.constructor.name,
				);
			}

			if (!reaction) {
				// Create a new reaction if none exists for this post
				reaction = new Reaction();
				reaction.user = user;
				reaction.post = post;
				post.reactions.push(reaction);
			}
		} else if (targetType === ReactionTargetType.COMMENT) {
			const comment = await this.entityManager.findOne(Comment, {
				where: { id: targetId },
				relations: ["reactions"],
			});
			if (!comment) {
				throw new NotFoundException("Comment not found");
			}

			// Check if the user has already reacted to this comment
			reaction = await this.entityManager.findOne(Reaction, {
				where: { user: { id: userId }, comment: { id: targetId } },
			});

			if (reaction && reaction.type === reactionType) {
				return new GenericResponse(
					"You have already reacted with this type to this comment.",
					this.constructor.name,
				);
			}
			if (!reaction) {
				// Create a new reaction if none exists for this comment
				reaction = new Reaction();
				reaction.user = user;
				reaction.comment = comment;
				comment.reactions.push(reaction);
			}
		} else {
			throw new NotFoundException("Invalid reaction target type");
		}

		// Set or update the reaction type
		reaction.type = reactionType;

		try {
			await this.entityManager.save(Reaction, reaction);
			return new GenericResponse("Reaction added or updated successfully", this.constructor.name);
		} catch {
			throw new InternalServerErrorException("Something went wrong. Please try again.");
		}
	}
}
