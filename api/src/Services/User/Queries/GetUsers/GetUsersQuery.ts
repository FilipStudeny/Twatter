import { User } from "@Models/User";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

import PaginatedUsersResponse from "./PaginatedUsersResponse.type";
import UserListItemDto from "../../../../Shared/Response/UserDetail";

export class GetUsersQuery {
	constructor(
		public readonly page: number,
		public readonly limit: number,
	) {}
}

@QueryHandler(GetUsersQuery)
export default class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(query: GetUsersQuery): Promise<PaginatedUsersResponse> {
		const { page, limit } = query;
		const skip = (page - 1) * limit;

		const [users, total] = await this.entityManager.findAndCount(User, {
			skip,
			take: limit,
		});

		const userDtos = this.mapper.mapArray(users, User, UserListItemDto);

		return new PaginatedUsersResponse(userDtos, total, page, limit);
	}
}
