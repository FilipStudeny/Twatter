import NotificationType from "@Models/Enums/NotificationType";
import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class NotificationDto {
	@Field({ nullable: true })
	@IsOptional()
	notificationId: string;

	@Field({ nullable: true })
	@IsOptional()
	receiverId: string;

	@Field({ nullable: true })
	@IsOptional()
	message: string;

	@Field(() => NotificationType, { nullable: true })
	@IsEnum(NotificationType)
	@IsNotEmpty()
	type: NotificationType = NotificationType.FRIEND_REQUEST;
}
