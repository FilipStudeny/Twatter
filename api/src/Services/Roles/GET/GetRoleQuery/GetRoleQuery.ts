import Role from "@Models/Role.entity";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

export class GetRoleByIdQuery {
	constructor(public readonly id: string) {}
}

@QueryHandler(GetRoleByIdQuery)
export class GetRoleByIdHandler implements IQueryHandler<GetRoleByIdQuery> {
	constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

	async execute(query: GetRoleByIdQuery): Promise<Role> {
		const { id } = query;
		const roleFound = await this.entityManager.findOne(Role, { where: { id } });

		if (!roleFound) {
			throw new NotFoundException(`Role with id ${id} not found`);
		}

		return roleFound;
	}
}
