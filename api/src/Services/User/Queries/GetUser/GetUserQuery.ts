// GetUserQueryHandler.ts
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { User } from "@Models/User";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { NotFoundException, BadRequestException } from "@nestjs/common";
import UserListItemDto from "@Services/User/Shared/UserListItem.dto";

// GetUserQuery.ts
export class GetUserQuery {
  constructor(
    public readonly id?: string,
    public readonly username?: string,
    public readonly firstName?: string,
    public readonly lastName?: string,
  ) {}
}

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(query: GetUserQuery): Promise<UserListItemDto> {
		const { id, username, firstName, lastName } = query;

		if (!id && !username && !firstName && !lastName) {
			throw new BadRequestException("At least one search criterion must be provided.");
		}

		const queryBuilder = this.entityManager.createQueryBuilder(User, "user");

		if (id) {
			queryBuilder.orWhere("user.id = :id", { id });
		}

		if (username) {
			queryBuilder.orWhere("user.username = :username", { username });
		}

		if (firstName) {
			queryBuilder.orWhere("user.firstName = :firstName", { firstName });
		}

		if (lastName) {
			queryBuilder.orWhere("user.lastName = :lastName", { lastName });
		}

		const user = await queryBuilder.getOne();

		if (!user) {
			throw new NotFoundException("User not found.");
		}

		const userDto = this.mapper.map(user, User, UserListItemDto);

		return userDto;
	}
}
