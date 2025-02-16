import NotificationType from "@Models/Enums/NotificationType";
import { Notification } from "@Models/Notification";
import { User } from "@Models/User";
import GenericResponse from "@Shared/Response/GenericResponse";
import { Injectable, Logger, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager, In } from "typeorm";

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
		receiver: User,
		sender: User,
		message: string,
		type: NotificationType,
	): Promise<GenericResponse> {
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
			await this.entityManager.delete(Notification, notification);
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
		receiver: User,
		sender: User,
		message: string,
		type: NotificationType,
	): Promise<GenericResponse> {
		if (notificationId) {
			const notificationById = await this.checkNotificationById(notificationId);
			if (notificationById) {
				return this.removeNotificationById(notificationId);
			}
		}
		const existingNotification = await this.checkNotificationByComposite(receiver.id, sender.id, type);
		if (existingNotification) {
			return this.removeNotificationByComposite(receiver.id, sender.id, type);
		}
		return this.createNotification(receiver, sender, message, type);
	}

	/**
	 * Retrieves the count of unread notifications for a specific user.
	 *
	 * @param receiverId - The ID of the user.
	 * @returns The count of unread notifications.
	 */
	async getUnreadNotificationsCount(receiverId: string): Promise<number> {
		return this.entityManager.count(Notification, {
			where: {
				receiver: { id: receiverId },
				isRead: false,
			},
		});
	}

	/**
	 * Retrieves a paginated list of notifications for a specific user,
	 * including sender details and total notifications count.
	 *
	 * @param receiverId - The ID of the user.
	 * @param page - The page number (default: 1).
	 * @param pageSize - The number of notifications per page (default: 10).
	 * @returns An object containing the paginated notifications and the total count.
	 */
	async getPaginatedNotifications(
		receiverId: string,
		page: number = 1,
		pageSize: number = 10,
	): Promise<{ notifications: Notification[]; total: number }> {
		const [notifications, total] = await this.entityManager.findAndCount(Notification, {
			where: {
				receiver: { id: receiverId },
			},
			relations: ["sender"],
			select: {
				id: true,
				message: true,
				type: true,
				isRead: true,
				createdAt: true,
				sender: {
					id: true,
					firstName: true,
					lastName: true,
					username: true,
					profilePictureUrl: true,
				},
			},
			order: {
				createdAt: "DESC",
			},
			take: pageSize,
			skip: (page - 1) * pageSize,
		});

		return { notifications, total };
	}

	/**
	 * Marks notifications as read based on a list of IDs.
	 *
	 * @param notificationIds - An array of notification IDs to be marked as read.
	 * @returns A GenericResponse indicating the update result.
	 */
	async markNotificationsAsRead(notificationIds: string[]): Promise<GenericResponse> {
		if (!notificationIds.length) {
			return new GenericResponse("No notifications provided", false);
		}

		try {
			await this.entityManager.update(Notification, { id: In(notificationIds) }, { isRead: true });
			return new GenericResponse("Notifications marked as read successfully");
		} catch (error) {
			this.logger.error("Error marking notifications as read", error.stack);
			throw new InternalServerErrorException("Failed to mark notifications as read");
		}
	}
}
