import { DbResponse } from "@Shared/DbResponse";
import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class UserDetail {
	@Field()
	id: string;

	@Field()
	email: string;

	@Field()
	firstName: string;

	@Field()
	lastName: string;

	@Field()
	username: string;

	@Field()
	postsCount: number;

	@Field()
	commentsCount: number;

	@Field()
	likesCount: number;

	@Field()
	joinedGroupsCount: number;

	@Field()
	banStrikesCount: number;

	@Field()
	sentNotificationsCount: number;

	@Field()
	filedReportsCount: number;

	@Field()
	receivedReportsCount: number;

	@Field()
	friendsCount: number;

	@Field()
	moderatedGroupsCount: number;

	@Field()
	createdGroupsCount: number;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;

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
		);
	}
}
