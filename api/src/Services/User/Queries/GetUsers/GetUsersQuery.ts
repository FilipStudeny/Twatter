// GetUsersQuery.ts
import { User } from "@Models/User";
import { DbResponse } from "@Shared/DbResponse";
import UserDetail from "@Shared/Response/UserDetail";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { BadRequestException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { validate as isUUID } from "uuid";

import PaginatedUsersResponse from "./PaginatedUsersResponse.type";

export class GetUsersQuery {
	constructor(
		public readonly page: number,
		public readonly limit: number,
		public readonly requestedFields: UserDetail,
		public readonly userId?: string,
		public readonly groupId?: string,
		public readonly getAll?: boolean,
		public readonly friendOf?: string,
		public readonly search?: string,
	) {}
}

@QueryHandler(GetUsersQuery)
export default class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(query: GetUsersQuery): Promise<PaginatedUsersResponse> {
		const { page, limit, requestedFields, userId, groupId, getAll, friendOf, search } = query;
		const skip = (page - 1) * limit;

		if (userId && !isUUID(userId)) {
			throw new BadRequestException("Invalid user ID.");
		}

		if (friendOf && !isUUID(friendOf)) {
			throw new BadRequestException("Invalid user ID.");
		}

		const qb = this.entityManager.createQueryBuilder(User, "user");

		qb.select(['user.id AS "user_id"']);

		if (userId) {
			qb.where("user.id = :userId", { userId });
		}

		if (search) {
			qb.andWhere(
				`(user.username ILIKE :search OR user.firstName ILIKE :search OR user.lastName ILIKE :search)`,
				{ search: `%${search}%` },
			);
		}

		qb.leftJoin("user.configuration", "config");
		if (requestedFields.userConfiguration) {
			qb.addSelect([
				'config.id AS "user_configuration_id"',
				'config.profileBackgroundColor1 AS "user_profileBackgroundColor1"',
				'config.profileBackgroundColor2 AS "user_profileBackgroundColor2"',
				'config.profileBackgroundLightAngle AS "user_profileBackgroundLightAngle"',
				'config.profileVisibility AS "user_profileVisibility"',
				'config.friendRequest_Email_Notification AS "user_friendRequest_Email_Notification"',
				'config.friendRequest_App_Notification AS "user_friendRequest_App_Notification"',
				'config.postReactedTo_Email_Notification AS "user_postReactedTo_Email_Notification"',
				'config.postReactedTo_App_Notification AS "user_postReactedTo_App_Notification"',
				'config.commentReactedTo_Email_Notification AS "user_commentReactedTo_Email_Notification"',
				'config.commentReactedTo_App_Notification AS "user_commentReactedTo_App_Notification"',
			]);
		}

		if (groupId) {
			qb.leftJoin("user.groups", "group");
			qb.andWhere("group.id = :groupId", { groupId });
		}

		if (friendOf) {
			qb.leftJoin("user.friends", "friends");
			qb.andWhere("friends.id = :friendOf", { friendOf });
		}

		if (requestedFields.email) {
			qb.addSelect('user.email AS "user_email"');
		}

		if (requestedFields.firstName) {
			qb.addSelect('user.firstName AS "user_firstName"');
		}

		if (requestedFields.lastName) {
			qb.addSelect('user.lastName AS "user_lastName"');
		}

		if (requestedFields.username) {
			qb.addSelect('user.username AS "user_username"');
		}

		if (requestedFields.profilePictureUrl) {
			qb.addSelect('user.profilePictureUrl AS "user_profilePictureUrl"');
		}

		if (requestedFields.postsCount) {
			qb.leftJoin("user.posts", "post");
			qb.addSelect('COUNT(DISTINCT post.id) AS "posts_count"');
		}

		if (requestedFields.commentsCount) {
			qb.leftJoin("user.comments", "comment");
			qb.addSelect('COUNT(DISTINCT comment.id) AS "comments_count"');
		}

		if (requestedFields.reactions) {
			qb.leftJoin("user.reactions", "reaction");
			const reactionsFields = [];

			if (requestedFields.reactions.like) {
				reactionsFields.push(
					`SUM(CASE WHEN reaction.type = 'like' THEN 1 ELSE 0 END) AS "like_count"`,
				);
			}
			if (requestedFields.reactions.dislike) {
				reactionsFields.push(
					`SUM(CASE WHEN reaction.type = 'dislike' THEN 1 ELSE 0 END) AS "dislike_count"`,
				);
			}
			if (requestedFields.reactions.smile) {
				reactionsFields.push(
					`SUM(CASE WHEN reaction.type = 'smile' THEN 1 ELSE 0 END) AS "smile_count"`,
				);
			}
			if (requestedFields.reactions.angry) {
				reactionsFields.push(
					`SUM(CASE WHEN reaction.type = 'angry' THEN 1 ELSE 0 END) AS "angry_count"`,
				);
			}
			if (requestedFields.reactions.sad) {
				reactionsFields.push(
					`SUM(CASE WHEN reaction.type = 'sad' THEN 1 ELSE 0 END) AS "sad_count"`,
				);
			}
			if (requestedFields.reactions.love) {
				reactionsFields.push(
					`SUM(CASE WHEN reaction.type = 'love' THEN 1 ELSE 0 END) AS "love_count"`,
				);
			}
			if (reactionsFields.length > 0) {
				qb.addSelect(reactionsFields);
			}
		}

		if (requestedFields.joinedGroupsCount) {
			qb.leftJoin("user.groups", "joinedGroup");
			qb.addSelect('COUNT(DISTINCT joinedGroup.id) AS "joinedGroups_count"');
		}

		if (requestedFields.banStrikesCount) {
			qb.leftJoin("user.banStrikes", "banStrike");
			qb.addSelect('COUNT(DISTINCT banStrike.id) AS "banStrikes_count"');
		}

		if (requestedFields.sentNotificationsCount) {
			qb.leftJoin("user.sentNotifications", "sentNotification");
			qb.addSelect('COUNT(DISTINCT sentNotification.id) AS "sentNotifications_count"');
		}

		if (requestedFields.filedReportsCount) {
			qb.leftJoin("user.reportsFiled", "filedReport");
			qb.addSelect('COUNT(DISTINCT filedReport.id) AS "filedReports_count"');
		}

		if (requestedFields.receivedReportsCount) {
			qb.leftJoin("user.reportsAgainst", "receivedReport");
			qb.addSelect('COUNT(DISTINCT receivedReport.id) AS "receivedReports_count"');
		}

		if (requestedFields.friendsCount) {
			qb.leftJoin("user.friends", "friend");
			qb.addSelect('COUNT(DISTINCT friend.id) AS "friends_count"');
		}

		if (requestedFields.moderatedGroupsCount) {
			qb.leftJoin("user.moderatedGroups", "moderatedGroup");
			qb.addSelect('COUNT(DISTINCT moderatedGroup.id) AS "moderatedGroups_count"');
		}

		if (requestedFields.createdGroupsCount) {
			qb.leftJoin("user.createdGroups", "createdGroup");
			qb.addSelect('COUNT(DISTINCT createdGroup.id) AS "createdGroups_count"');
		}

		qb.addSelect('COUNT(*) OVER() AS "total_count"');

		const groupByFields = ["user.id"];

		if (requestedFields.email) {
			groupByFields.push("user.email");
		}

		if (requestedFields.firstName) {
			groupByFields.push("user.firstName");
		}

		if (requestedFields.lastName) {
			groupByFields.push("user.lastName");
		}

		if (requestedFields.username) {
			groupByFields.push("user.username");
		}

		if (requestedFields.userConfiguration) {
			groupByFields.push(
				"user_configuration_id",
				"config.profileBackgroundColor1",
				"config.profileBackgroundColor2",
				"config.friendRequest_Email_Notification",
				"config.friendRequest_App_Notification",
				"config.postReactedTo_Email_Notification",
				"config.postReactedTo_App_Notification",
				"config.commentReactedTo_Email_Notification",
				"config.commentReactedTo_App_Notification",
			);
		}

		qb.groupBy(groupByFields.join(", "));
		qb.orderBy("user.username", "ASC");

		if (!getAll) {
			qb.offset(skip).limit(limit);
		}

		const usersWithCounts: DbResponse[] = await qb.getRawMany();
		const total = usersWithCounts.length > 0 ? parseInt(usersWithCounts[0].total_count, 10) : 0;
		const users = usersWithCounts.map((userWithCounts) =>
			this.mapper.map(userWithCounts, DbResponse, UserDetail),
		);

		return new PaginatedUsersResponse(users, total, page, limit);
	}
}
