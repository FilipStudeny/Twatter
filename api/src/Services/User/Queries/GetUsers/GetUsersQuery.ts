// GetUsersQuery.ts
import { User } from "@Models/User";
import { DbResponse } from "@Shared/DbResponse";
import UserDetail from "@Shared/Response/UserDetail";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

import PaginatedUsersResponse from "./PaginatedUsersResponse.type";

export class GetUsersQuery {
	constructor(
		public readonly page: number,
		public readonly limit: number,
		public readonly requestedFields: UserDetail,
		public readonly userId?: string,
		public readonly groupId?: string,
		public readonly getAll?: boolean,
	) {}
}

@QueryHandler(GetUsersQuery)
export default class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(query: GetUsersQuery): Promise<PaginatedUsersResponse> {
		const { page, limit, requestedFields, userId, groupId, getAll } = query;
		const skip = (page - 1) * limit;

		const qb = this.entityManager.createQueryBuilder(User, "user");

		qb.select(['user.id AS "user_id"']);

		if (userId) {
			qb.where("user.id = :userId", { userId });
		}

		if (groupId) {
			qb.leftJoin("user.groups", "group");
			qb.andWhere("group.id = :groupId", { groupId });
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

		if (requestedFields.postsCount) {
			qb.leftJoin("user.posts", "post");
			qb.addSelect('COUNT(DISTINCT post.id) AS "posts_count"');
		}

		if (requestedFields.commentsCount) {
			qb.leftJoin("user.comments", "comment");
			qb.addSelect('COUNT(DISTINCT comment.id) AS "comments_count"');
		}

		if (requestedFields.likesCount) {
			qb.leftJoin("user.reactions", "reaction");
			qb.addSelect(`SUM(CASE WHEN reaction.type = 'like' THEN 1 ELSE 0 END) AS "likes_count"`);
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
