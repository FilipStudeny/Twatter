import { User } from "@Models/User";
import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { Field, ObjectType, Int } from "@nestjs/graphql";

@ObjectType()
export default class UserDetail {
	@Field(() => String, { nullable: true })
	id?: string;

	@Field(() => String, { nullable: true })
	email?: string;

	@Field(() => String, { nullable: true })
	firstName?: string;

	@Field(() => String, { nullable: true })
	lastName?: string;

	@Field(() => String, { nullable: true })
	username?: string;

	@Field(() => Int, { nullable: true })
	postsCount?: number;

	@Field(() => Int, { nullable: true })
	commentsCount?: number;

	@Field(() => Int, { nullable: true })
	likesCount?: number;

	@Field(() => Int, { nullable: true })
	joinedGroupsCount?: number;

	@Field(() => Int, { nullable: true })
	banStrikesCount?: number;

	@Field(() => Int, { nullable: true })
	sentNotificationsCount?: number;

	@Field(() => Int, { nullable: true })
	filedReportsCount?: number;

	@Field(() => Int, { nullable: true })
	receivedReportsCount?: number;

	@Field(() => Int, { nullable: true })
	friendsCount?: number;

	@Field(() => Int, { nullable: true })
	moderatedGroupsCount?: number;

	@Field(() => Int, { nullable: true })
	createdGroupsCount?: number;

	static createMap(mapper: Mapper): void {
		createMap(
			mapper,
			User,
			UserDetail,
			forMember(
				(dto) => dto.id,
				mapFrom((entity) => entity.id),
			),
			forMember(
				(dto) => dto.email,
				mapFrom((entity) => entity.email),
			),
			forMember(
				(dto) => dto.firstName,
				mapFrom((entity) => entity.firstName),
			),
			forMember(
				(dto) => dto.lastName,
				mapFrom((entity) => entity.lastName),
			),
			forMember(
				(dto) => dto.username,
				mapFrom((entity) => entity.username),
			),
			forMember(
				(dto) => dto.postsCount,
				mapFrom((entity) => entity.posts.length),
			),
			forMember(
				(dto) => dto.commentsCount,
				mapFrom((entity) => entity.comments.length),
			),
			forMember(
				(dto) => dto.likesCount,
				mapFrom((entity) => entity.reactions.filter((r) => r.type === "like").length),
			),
			forMember(
				(dto) => dto.joinedGroupsCount,
				mapFrom((entity) => entity.groups.length),
			),
			forMember(
				(dto) => dto.banStrikesCount,
				mapFrom((entity) => entity.banStrikes.length),
			),
			forMember(
				(dto) => dto.sentNotificationsCount,
				mapFrom((entity) => entity.sentNotifications.length),
			),
			forMember(
				(dto) => dto.filedReportsCount,
				mapFrom((entity) => entity.reportsFiled.length),
			),
			forMember(
				(dto) => dto.receivedReportsCount,
				mapFrom((entity) => entity.reportsAgainst.length),
			),
			forMember(
				(dto) => dto.friendsCount,
				mapFrom((entity) => entity.friends.length),
			),
			forMember(
				(dto) => dto.moderatedGroupsCount,
				mapFrom((entity) => entity.moderatedGroups.length),
			),
			forMember(
				(dto) => dto.createdGroupsCount,
				mapFrom((entity) => entity.createdGroups.length),
			),
		);
	}
}
