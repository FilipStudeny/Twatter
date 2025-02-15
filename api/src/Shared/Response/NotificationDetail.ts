import NotificationType from "@Models/Enums/NotificationType";
import { Notification } from "@Models/Notification";
import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { Field, ObjectType } from "@nestjs/graphql";

import UserDetail from "./UserDetail";

@ObjectType()
export class NotificationDetail {
	@Field()
	id: string;

	@Field()
	message: string;

	@Field()
	isRead: boolean;

	@Field(() => UserDetail)
	creator: UserDetail;

	@Field(() => NotificationType)
	notificationType: NotificationType;

	@Field({ nullable: true })
	createdAt: Date;

	@Field({ nullable: true })
	updatedAt: Date;

	static createMap(mapper: Mapper): void {
		createMap(
			mapper,
			Notification,
			NotificationDetail,
			forMember(
				(destination) => destination.id,
				mapFrom((source) => source.id),
			),
			forMember(
				(destination) => destination.message,
				mapFrom((source) => source.message),
			),
			forMember(
				(destination) => destination.isRead,
				mapFrom((source) => source.isRead),
			),
			forMember(
				(destination) => destination.createdAt,
				mapFrom((source) => source.createdAt),
			),
			forMember(
				(destination) => destination.notificationType,
				mapFrom((source) => source.type),
			),
			forMember(
				(destination) => destination.creator,
				mapFrom(
					(source) =>
						({
							id: source.sender.id,
							username: source.sender.username,
							firstName: source.sender.firstName,
							lastName: source.sender.lastName,
							profilePictureUrl: source.sender.lastName,
						}) as UserDetail,
				),
			),
		);
	}
}
