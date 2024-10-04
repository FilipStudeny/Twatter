// GetUserByIdQueryHandler.ts

import User from "@Models/User.entity";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import UserListItemDto from "../GetUsers/UserListItem.dto";

export class GetUserQuery {
	constructor(public readonly id: string) {}
}

@QueryHandler(GetUserQuery)
export default class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(query: GetUserQuery): Promise<UserListItemDto | null> {
		const user = await this.entityManager.findOne(User, {
			where: { id: query.id },
		});

		if (!user) {
			return null;
		}

		const userDto = this.mapper.map(user, User, UserListItemDto);
		return userDto;
	}
}
