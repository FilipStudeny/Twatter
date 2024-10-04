import User from "@Models/User.entity";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

import PaginatedUsersResponse from "./PaginatedUserResponse.dto";
import UserListItemDto from "./UserListItem.dto";

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

		// Fetch users with pagination
		const [users, total] = await this.entityManager.findAndCount(User, {
			skip,
			take: limit,
		});

		// Map users to DTOs
		const userDtos = this.mapper.mapArray(users, User, UserListItemDto);

		// Automatically pass the handler's name (action) to PaginatedUsersResponse
		return new PaginatedUsersResponse(
			userDtos,
			total,
			page,
			limit,
			this.constructor.name,
		);
	}
}
