import { User } from "@Models/User";
import GenericResponse from "@Shared/Response/GenericResponse";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

export class UpdateFriendCommand {
	constructor(
		public readonly userId: string,
		public readonly authenticatedUserId: string,
	) {}
}

@CommandHandler(UpdateFriendCommand)
export class UpdateFriendCommandHandler implements ICommandHandler<UpdateFriendCommand> {
	constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

	async execute(command: UpdateFriendCommand): Promise<GenericResponse> {
		const { authenticatedUserId, userId } = command;

		const userToUpdate = await this.entityManager.findOne(User, {
			where: { id: userId },
			relations: ["friends"],
		});

		const authenticatedUser = await this.entityManager.findOne(User, {
			where: { id: authenticatedUserId },
			relations: ["friends"],
		});

		if (!userToUpdate || !authenticatedUser) {
			throw new NotFoundException("User not found");
		}

		const areFriends = authenticatedUser.friends.some((friend) => friend.id === userToUpdate.id);

		if (areFriends) {
			authenticatedUser.friends = authenticatedUser.friends.filter(
				(friend) => friend.id !== userToUpdate.id,
			);
			userToUpdate.friends = userToUpdate.friends.filter(
				(friend) => friend.id !== authenticatedUser.id,
			);
		} else {
			authenticatedUser.friends.push(userToUpdate);
			userToUpdate.friends.push(authenticatedUser);
		}

		try {
			await this.entityManager.save(User, [authenticatedUser, userToUpdate]);

			const message = areFriends
				? `${userToUpdate.username ?? `${userToUpdate.firstName} ${userToUpdate.lastName}`} is no longer your friend`
				: `${userToUpdate.username ?? `${userToUpdate.firstName} ${userToUpdate.lastName}`} is now your friend`;
			return new GenericResponse(message);
		} catch (error) {
			if (error.code === "23503") {
				throw new NotFoundException("Invalid foreign key provided.");
			}
			throw new InternalServerErrorException("Something went wrong. Please try again.");
		}
	}
}
