import Role from "@Models/Role.entity";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

export class GetAllRolesQuery {}

@QueryHandler(GetAllRolesQuery)
export class GetAllRolesHandler implements IQueryHandler<GetAllRolesQuery> {
	constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async execute(_query: GetAllRolesQuery): Promise<Role[]> {
		const roles = await this.entityManager.find(Role);

		return roles;
	}
}
