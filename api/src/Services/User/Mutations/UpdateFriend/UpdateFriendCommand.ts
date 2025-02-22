import { InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

import { User } from "@Models/User";
import { Notification } from "@Models/Notification";
import NotificationType from "@Models/Enums/NotificationType";
import GenericResponse from "@Shared/Response/GenericResponse";

export class UpdateFriendCommand {
	constructor(
		public readonly userId: string,
		public readonly authenticatedUserId: string,
	) {}
}

@CommandHandler(UpdateFriendCommand)
export class UpdateFriendCommandHandler implements ICommandHandler<UpdateFriendCommand> {
	// Use the UpdateFriendCommandHandler name or another context label
	private readonly logger = new Logger(UpdateFriendCommandHandler.name);

	constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

	async execute(command: UpdateFriendCommand): Promise<GenericResponse> {
		const { authenticatedUserId, userId } = command;

		this.logger.log(
			`Starting friend update process. AuthenticatedUserId: ${authenticatedUserId}, TargetUserId: ${userId}`,
		);

		const userToUpdate = await this.entityManager.findOne(User, {
			where: { id: userId },
			relations: ["friends"],
		});
		const authenticatedUser = await this.entityManager.findOne(User, {
			where: { id: authenticatedUserId },
			relations: ["friends"],
		});

		if (!userToUpdate || !authenticatedUser) {
			this.logger.warn(
				`User not found. authenticatedUserId: ${authenticatedUserId}, userId: ${userId}`,
			);
			throw new NotFoundException("User not found");
		}

		this.logger.log(`Users found. Proceeding with friend update.`);

		const areFriends = authenticatedUser.friends.some((friend) => friend.id === userToUpdate.id);
		this.logger.debug(`Are users already friends? ${areFriends}`);

		if (areFriends) {
			this.logger.log(`Users are currently friends. Removing friendship.`);

			authenticatedUser.friends = authenticatedUser.friends.filter(
				(friend) => friend.id !== userToUpdate.id,
			);
			userToUpdate.friends = userToUpdate.friends.filter(
				(friend) => friend.id !== authenticatedUser.id,
			);
		} else {
			this.logger.log(`Users are not friends yet. Adding friendship.`);

			authenticatedUser.friends.push(userToUpdate);
			userToUpdate.friends.push(authenticatedUser);

			await this.removeFriendRequestNotification(authenticatedUserId, userId);
		}

		try {
			await this.entityManager.save(User, [authenticatedUser, userToUpdate]);
			this.logger.log(`Friendship update saved successfully.`);

			const message = areFriends
				? `${userToUpdate.username ?? `${userToUpdate.firstName} ${userToUpdate.lastName}`} is no longer your friend`
				: `${userToUpdate.username ?? `${userToUpdate.firstName} ${userToUpdate.lastName}`} is now your friend`;

			return new GenericResponse(message);
		} catch (error) {
			this.logger.error(`Error updating friendship: ${error?.message || error}`);
			if (error.code === "23503") {
				throw new NotFoundException("Invalid foreign key provided.");
			}
			throw new InternalServerErrorException("Something went wrong. Please try again.");
		}
	}

	/**
	 * Removes friend-request notifications between two users (if any exist).
	 */
	private async removeFriendRequestNotification(currentUserId: string, otherUserId: string): Promise<void> {
		this.logger.debug(`Removing friend request notification between ${currentUserId} and ${otherUserId}.`);

		const notifications = await this.entityManager.find(Notification, {
			where: [
				{
					type: NotificationType.FRIEND_REQUEST,
					receiver: { id: currentUserId },
					sender: { id: otherUserId },
				},
				{
					type: NotificationType.FRIEND_REQUEST,
					receiver: { id: otherUserId },
					sender: { id: currentUserId },
				},
			],
			relations: ["sender", "receiver"],
		});

		if (notifications.length > 0) {
			this.logger.log(`Found ${notifications.length} friend request notification(s). Removing...`);
			await this.entityManager.remove(notifications);
			this.logger.log(`Friend request notifications removed.`);
		} else {
			this.logger.debug(`No existing friend request notifications to remove.`);
		}
	}
}
