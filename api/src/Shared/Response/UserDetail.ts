import { User } from "@Models/User";
import { DbResponse } from "@Shared/DbResponse";
import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { Field, ObjectType } from "@nestjs/graphql";

import { ReactionsCount } from "./ReactionsCount";
import UserConfigurationDetail from "./UserConfigurationResponse";

@ObjectType()
export default class UserDetail {
	@Field()
	id: string;

	@Field({ nullable: true })
	email?: string;

	@Field({ nullable: true })
	firstName?: string;

	@Field({ nullable: true })
	lastName?: string;

	@Field({ nullable: true })
	username?: string;

	@Field({ nullable: true })
	profilePictureUrl?: string;

	@Field({ nullable: true })
	postsCount?: number;

	@Field({ nullable: true })
	commentsCount?: number;

	@Field(() => ReactionsCount, { nullable: true })
	reactions?: ReactionsCount;

	@Field(() => UserConfigurationDetail)
	userConfiguration: UserConfigurationDetail;

	@Field({ nullable: true })
	joinedGroupsCount?: number;

	@Field({ nullable: true })
	banStrikesCount?: number;

	@Field({ nullable: true })
	sentNotificationsCount?: number;

	@Field({ nullable: true })
	filedReportsCount?: number;

	@Field({ nullable: true })
	receivedReportsCount?: number;

	@Field({ nullable: true })
	friendsCount?: number;

	@Field({ nullable: true })
	moderatedGroupsCount?: number;

	@Field({ nullable: true })
	createdGroupsCount?: number;

	@Field({ nullable: true })
	createdAt?: Date;

	@Field({ nullable: true })
	updatedAt?: Date;

	static createMap(mapper: Mapper): void {
		createMap(
			mapper,
			DbResponse,
			UserDetail,
			forMember(
				(destination) => destination.id,
				mapFrom((source) => source.user_id),
			),
			forMember(
				(destionation) => destionation.email,
				mapFrom((source) => source.user_email),
			),
			forMember(
				(destination) => destination.firstName,
				mapFrom((source) => source.user_firstName),
			),
			forMember(
				(destination) => destination.lastName,
				mapFrom((source) => source.user_lastName),
			),
			forMember(
				(destionation) => destionation.username,
				mapFrom((source) => source.user_username),
			),
			forMember(
				(destination) => destination.profilePictureUrl,
				mapFrom((source) => source.user_profilePictureUrl),
			),
			forMember(
				(destionation) => destionation.postsCount,
				mapFrom((source) => parseInt(source.posts_count, 10)),
			),

			forMember(
				(destionation) => destionation.commentsCount,
				mapFrom((source) => parseInt(source.comments_count, 10)),
			),

			forMember(
				(destionation) => destionation.joinedGroupsCount,
				mapFrom((source) => parseInt(source.joinedGroups_count, 10)),
			),

			forMember(
				(destionation) => destionation.banStrikesCount,
				mapFrom((source) => parseInt(source.banStrikes_count, 10)),
			),

			forMember(
				(destionation) => destionation.sentNotificationsCount,
				mapFrom((source) => parseInt(source.sentNotifications_count, 10)),
			),

			forMember(
				(dto) => dto.filedReportsCount,
				mapFrom((entity) => parseInt(entity.filedReports_count, 10)),
			),

			forMember(
				(destionation) => destionation.receivedReportsCount,
				mapFrom((source) => parseInt(source.receivedReports_count, 10)),
			),

			forMember(
				(destionation) => destionation.friendsCount,
				mapFrom((source) => parseInt(source.friends_count, 10)),
			),

			forMember(
				(destionation) => destionation.moderatedGroupsCount,
				mapFrom((source) => parseInt(source.moderatedGroups_count, 10)),
			),

			forMember(
				(destionation) => destionation.createdGroupsCount,
				mapFrom((source) => parseInt(source.createdGroups_count, 10)),
			),
			forMember(
				(destination) => destination.updatedAt,
				mapFrom((source) => source.user_updatedAt),
			),
			forMember(
				(destination) => destination.createdAt,
				mapFrom((source) => source.user_createdAt),
			),
			forMember(
				(destination) => destination.reactions,
				mapFrom(
					(source) =>
						({
							like: parseInt(source.like_count || "0", 10),
							dislike: parseInt(source.dislike_count || "0", 10),
							smile: parseInt(source.smile_count || "0", 10),
							angry: parseInt(source.angry_count || "0", 10),
							sad: parseInt(source.sad_count || "0", 10),
							love: parseInt(source.love_count || "0", 10),
						}) as ReactionsCount,
				),
			),
			forMember(
				(destination) => destination.userConfiguration,
				mapFrom(
					(source) =>
						({
							id: source.user_configuration_id,
							profileBackgroundColor1: source.user_profileBackgroundColor1,
							profileBackgroundColor2: source.user_profileBackgroundColor2,
							friendRequest_Email_Notification:
								source.user_friendRequest_Email_Notification,
							friendRequest_App_Notification:
								source.user_friendRequest_App_Notification,
							postReactedTo_Email_Notification:
								source.user_postReactedTo_Email_Notification,
							postReactedTo_App_Notification:
								source.user_postReactedTo_App_Notification,
							commentReactedTo_Email_Notification:
								source.user_commentReactedTo_Email_Notification,
							commentReactedTo_App_Notification:
								source.user_commentReactedTo_App_Notification,
						}) as UserConfigurationDetail,
				),
			),
		);

		createMap(
			mapper,
			User,
			UserDetail,
			forMember(
				(destination) => destination.id,
				mapFrom((source) => source.id),
			),
			forMember(
				(destination) => destination.firstName,
				mapFrom((source) => source.firstName),
			),
			forMember(
				(destination) => destination.lastName,
				mapFrom((source) => source.lastName),
			),
			forMember(
				(destination) => destination.username,
				mapFrom((source) => source.username),
			),
			forMember(
				(destination) => destination.email,
				mapFrom((source) => source.email),
			),
			forMember(
				(destination) => destination.profilePictureUrl,
				mapFrom((source) => source.profilePictureUrl),
			),
		);
	}
}
