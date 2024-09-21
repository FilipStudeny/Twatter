import Role from "@Models/Role.entity";
import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";

import { GetRoleByIdQuery } from "./GET/GetRoleQuery/GetRoleQuery";
import { GetAllRolesQuery } from "./GET/GetRolesQuery/GetRolesQuery";
import CreateRoleDto from "./POST/CreateRoleCommand/CreateRoleDto";
import { CreateRoleCommand } from "./POST/CreateRoleCommand/CreteRoleCommand";

@Injectable()
export default class RolesService {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	async createRole(dto: CreateRoleDto): Promise<Role> {
		const { name } = dto;
		return this.commandBus.execute(new CreateRoleCommand(name));
	}

	async getRoleById(id: string): Promise<Role | null> {
		return this.queryBus.execute(new GetRoleByIdQuery(id));
	}

	async getAllRoles(): Promise<Role[]> {
		return this.queryBus.execute(new GetAllRolesQuery());
	}
}
