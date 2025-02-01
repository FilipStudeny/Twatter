import NotificationType from "@Models/Enums/NotificationType";
import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class NotificationDto {
	@Field()
	@IsNotEmpty()
	receiverId: string;

	@Field({ nullable: true })
	@IsOptional()
	message: string;

	@Field(() => NotificationType)
	@IsEnum(NotificationType)
	@IsNotEmpty()
	type: NotificationType = NotificationType.FRIEND_REQUEST;
}
