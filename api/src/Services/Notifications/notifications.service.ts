import NotificationType from "@Models/Enums/NotificationType";
import { Notification } from "@Models/Notification";
import { User } from "@Models/User";
import GenericResponse from "@Shared/Response/GenericResponse";
import { Injectable, Logger, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

@Injectable()
export class NotificationsService {
	private readonly logger = new Logger(NotificationsService.name);

	constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

	/**
	 * Toggles a notification.
	 *
	 * This method checks if a notification (of the provided type)
	 * already exists for the given receiver and sender. If it does,
	 * the notification is removed. If it does not exist, a new notification
	 * is created.
	 *
	 * @param receiverId - The ID of the user who will receive the notification.
	 * @param senderId - The ID of the user who initiated the notification.
	 * @param message - The notification message.
	 * @param type - The type of notification.
	 * @returns A GenericResponse indicating whether the notification was created or removed.
	 */
	async createNotification(
		receiverId: string,
		senderId: string,
		message: string,
		type: NotificationType,
	): Promise<GenericResponse> {
		this.logger.log(`Toggling notification: sender=${senderId}, receiver=${receiverId}, type=${type}`);

		// Check if a notification with the same receiver, sender, and type already exists.
		const existingNotification = await this.entityManager.findOne(Notification, {
			where: {
				receiver: { id: receiverId },
				sender: { id: senderId },
				type,
			},
			select: { id: true },
		});

		if (existingNotification) {
			try {
				await this.entityManager.remove(Notification, existingNotification);
				return new GenericResponse("Notification removed successfully");
			} catch (error) {
				this.logger.error("Error removing existing notification", error.stack);
				throw new InternalServerErrorException("Failed to remove existing notification");
			}
		}

		// Verify the existence of the receiver.
		const receiver = await this.entityManager.findOne(User, {
			where: { id: receiverId },
			select: { id: true },
		});
		if (!receiver) {
			throw new NotFoundException("Receiver not found");
		}

		// Verify the existence of the sender.
		const sender = await this.entityManager.findOne(User, {
			where: { id: senderId },
			select: { id: true },
		});
		if (!sender) {
			throw new NotFoundException("Sender not found");
		}

		// Create a new notification.
		const notification = new Notification();
		notification.receiver = receiver;
		notification.sender = sender;
		notification.message = message;
		notification.type = type;
		notification.isRead = false;

		try {
			await this.entityManager.save(Notification, notification);
			return new GenericResponse("Notification created successfully");
		} catch (error) {
			this.logger.error("Error creating notification", error.stack);
			throw new InternalServerErrorException("Failed to create notification");
		}
	}

	/**
	 * Removes a notification.
	 *
	 * This method removes a notification of the provided type for the given receiver and sender.
	 *
	 * @param receiverId - The ID of the user who received the notification.
	 * @param senderId - The ID of the user who sent the notification.
	 * @param type - The type of notification to remove.
	 * @returns A GenericResponse indicating the outcome.
	 */
	async removeNotification(
		receiverId: string,
		senderId: string,
		type: NotificationType,
	): Promise<GenericResponse> {
		this.logger.log(`Removing notification: sender=${senderId}, receiver=${receiverId}, type=${type}`);

		const existingNotification = await this.entityManager.findOne(Notification, {
			where: {
				receiver: { id: receiverId },
				sender: { id: senderId },
				type,
			},
			select: { id: true },
		});

		if (!existingNotification) {
			throw new NotFoundException("Notification not found");
		}

		try {
			await this.entityManager.remove(Notification, existingNotification);
			return new GenericResponse("Notification removed successfully");
		} catch (error) {
			this.logger.error("Error removing notification", error.stack);
			throw new InternalServerErrorException("Failed to remove notification");
		}
	}
}
