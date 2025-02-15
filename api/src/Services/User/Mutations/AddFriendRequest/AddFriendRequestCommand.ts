import { User } from "@Models/User";
import { EmailService } from "@Services/Email/email.service";
import { NotificationsService } from "@Services/Notifications/notifications.service";
import { NotificationDto } from "@Shared/Input/NotificationDto";
import GenericResponse from "@Shared/Response/GenericResponse";
import { NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

export class AddFriendRequestCommand {
	constructor(
		public readonly senderId: string,
		public readonly dto: NotificationDto,
	) {}
}

@CommandHandler(AddFriendRequestCommand)
export class AddFriendRequestCommandHandler implements ICommandHandler<AddFriendRequestCommand> {
	constructor(
		private readonly notificationsService: NotificationsService,
		private readonly emailService: EmailService,
		@InjectEntityManager() private readonly entityManager: EntityManager,
	) {}

	async execute(command: AddFriendRequestCommand): Promise<GenericResponse> {
		const { senderId, dto } = command;

		const sender = await this.entityManager.findOne<User>(User, {
			where: { id: senderId },
			relations: ["friends", "configuration"],
			select: {
				username: true,
				firstName: true,
				lastName: true,
				email: true,
				configuration: {
					friendRequest_App_Notification: true,
					friendRequest_Email_Notification: true,
				},
				id: true,
				profilePictureUrl: true,
			},
		});

		if (!sender) {
			throw new NotFoundException("Sender not found");
		}

		const receiver = await this.entityManager.findOne<User>(User, {
			where: { id: dto.receiverId },
			relations: ["friends", "configuration"],
			select: {
				username: true,
				firstName: true,
				lastName: true,
				email: true,
				configuration: {
					friendRequest_App_Notification: true,
					friendRequest_Email_Notification: true,
				},
				id: true,
				profilePictureUrl: true,
			},
		});

		if (!receiver) {
			throw new NotFoundException("Receiver not found");
		}

		try {
			const notificationExist = await this.notificationsService.checkNotificationById(
				dto.notificationId,
			);

			if (notificationExist) {
				return await this.notificationsService.removeNotificationById(dto.notificationId);
			}

			if (receiver.configuration.friendRequest_Email_Notification) {
				await this.emailService.sendFriendRequest(
					receiver.email,
					sender.username,
					sender.firstName,
					sender.lastName,
					sender.profilePictureUrl,
					"",
				);
			}

			return await this.notificationsService.createNotification(
				receiver,
				sender,
				dto.message,
				dto.type,
			);
		} catch (error) {
			if (error.code === "23503") {
				throw new NotFoundException("Invalid foreign key provided.");
			}
			throw new InternalServerErrorException("Something went wrong. Please try again.");
		}
	}
}
