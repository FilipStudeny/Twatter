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
	 * Checks if a notification exists based on receiver, sender, and type.
	 *
	 * @param receiverId - The ID of the receiver.
	 * @param senderId - The ID of the sender.
	 * @param type - The type of notification.
	 * @returns The notification if found, or undefined if not.
	 */
	async checkNotificationByComposite(
		receiverId: string,
		senderId: string,
		type: NotificationType,
	): Promise<Notification | undefined> {
		return this.entityManager.findOne(Notification, {
			where: {
				receiver: { id: receiverId },
				sender: { id: senderId },
				type,
			},
			select: ["id"],
		});
	}

	/**
	 * Checks if a notification exists based on its unique ID.
	 *
	 * @param notificationId - The unique ID of the notification.
	 * @returns The notification if found, or undefined if not.
	 */
	async checkNotificationById(notificationId: string): Promise<Notification | undefined> {
		return this.entityManager.findOne(Notification, {
			where: { id: notificationId },
			select: ["id"],
		});
	}

	/**
	 * Creates a new notification.
	 *
	 * This method verifies that both the receiver and sender exist (retrieving only their IDs)
	 * and then creates a notification with the provided message and type.
	 *
	 * @param receiverId - The ID of the user who will receive the notification.
	 * @param senderId - The ID of the user who initiated the notification.
	 * @param message - The notification message.
	 * @param type - The type of notification.
	 * @returns A GenericResponse indicating whether the notification was created successfully.
	 */
	async createNotification(
		receiverId: string,
		senderId: string,
		message: string,
		type: NotificationType,
	): Promise<GenericResponse> {
		// Verify the existence of the receiver.
		const receiver = await this.entityManager.findOne(User, {
			where: { id: receiverId },
			select: ["id"],
		});
		if (!receiver) {
			throw new NotFoundException("Receiver not found");
		}

		// Verify the existence of the sender.
		const sender = await this.entityManager.findOne(User, {
			where: { id: senderId },
			select: ["id"],
		});
		if (!sender) {
			throw new NotFoundException("Sender not found");
		}

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
	 * Removes a notification using its unique ID.
	 *
	 * @param notificationId - The unique ID of the notification.
	 * @returns A GenericResponse indicating whether the removal was successful.
	 */
	async removeNotificationById(notificationId: string): Promise<GenericResponse> {
		const notification = await this.checkNotificationById(notificationId);
		if (!notification) {
			throw new NotFoundException("Notification not found");
		}
		try {
			await this.entityManager.remove(Notification, notification);
			return new GenericResponse("Notification removed successfully");
		} catch (error) {
			this.logger.error("Error removing notification by ID", error.stack);
			throw new InternalServerErrorException("Failed to remove notification");
		}
	}

	/**
	 * Removes a notification using composite keys.
	 *
	 * This method checks if the notification exists by receiver, sender, and type and then removes it.
	 *
	 * @param receiverId - The ID of the receiver.
	 * @param senderId - The ID of the sender.
	 * @param type - The type of notification.
	 * @returns A GenericResponse indicating whether the removal was successful.
	 */
	async removeNotificationByComposite(
		receiverId: string,
		senderId: string,
		type: NotificationType,
	): Promise<GenericResponse> {
		const notification = await this.checkNotificationByComposite(receiverId, senderId, type);
		if (!notification) {
			throw new NotFoundException("Notification not found");
		}
		try {
			await this.entityManager.remove(Notification, notification);
			return new GenericResponse("Notification removed successfully");
		} catch (error) {
			this.logger.error("Error removing notification", error.stack);
			throw new InternalServerErrorException("Failed to remove notification");
		}
	}

	/**
	 * Toggles a notification.
	 *
	 * Checks if a notification exists:
	 *   - If notificationId is provided, it checks by that ID.
	 *   - Otherwise, it checks by receiver, sender, and type.
	 *
	 * If the notification exists, it is removed.
	 * If it does not exist, a new notification is created.
	 *
	 * @param notificationId - (Optional) The unique ID of the notification.
	 * @param receiverId - The ID of the receiver.
	 * @param senderId - The ID of the sender.
	 * @param message - The notification message.
	 * @param type - The type of notification.
	 * @returns A GenericResponse indicating the outcome.
	 */
	async toggleNotification(
		notificationId: string | undefined,
		receiverId: string,
		senderId: string,
		message: string,
		type: NotificationType,
	): Promise<GenericResponse> {
		if (notificationId) {
			const notificationById = await this.checkNotificationById(notificationId);
			if (notificationById) {
				return this.removeNotificationById(notificationId);
			}
		}
		const existingNotification = await this.checkNotificationByComposite(receiverId, senderId, type);
		if (existingNotification) {
			return this.removeNotificationByComposite(receiverId, senderId, type);
		}
		return this.createNotification(receiverId, senderId, message, type);
	}
}
