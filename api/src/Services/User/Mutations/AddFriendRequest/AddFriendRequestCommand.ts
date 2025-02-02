import { NotificationsService } from "@Services/Notifications/notifications.service";
import { NotificationDto } from "@Shared/Input/NotificationDto";
import GenericResponse from "@Shared/Response/GenericResponse";
import { NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

export class AddFriendRequestCommand {
	constructor(
		public readonly senderId: string,
		public readonly dto: NotificationDto,
	) {}
}

@CommandHandler(AddFriendRequestCommand)
export class AddFriendRequestCommandHandler implements ICommandHandler<AddFriendRequestCommand> {
	constructor(private readonly notificationsService: NotificationsService) {}

	async execute(command: AddFriendRequestCommand): Promise<GenericResponse> {
		const { senderId, dto } = command;

		try {
			// Pass the notificationId from the DTO (if provided) along with the other parameters.
			const response = await this.notificationsService.toggleNotification(
				dto.notificationId,
				dto.receiverId,
				senderId,
				dto.message,
				dto.type,
			);

			return response;
		} catch (error) {
			if (error.code === "23503") {
				throw new NotFoundException("Invalid foreign key provided.");
			}
			throw new InternalServerErrorException("Something went wrong. Please try again.");
		}
	}
}
