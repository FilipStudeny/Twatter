import Role from "@Models/Role.entity";
import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import CreateRoleDto from "./POST/CreateRoleCommand/CreateRoleDto";
import RoleService from "./roles.service";

@Controller("roles")
@UseGuards(AuthGuard())
export default class RolesController {
	constructor(private readonly roleService: RoleService) {}

	@Get(":id")
	async getRoleById(@Param("id") id: string): Promise<Role | null> {
		return this.roleService.getRoleById(id);
	}

	@Get()
	async getAllRoles(): Promise<Role[]> {
		return this.roleService.getAllRoles();
	}

	@Post()
	async createRole(@Body() createRoleDto: CreateRoleDto) {
		return this.roleService.createRole(createRoleDto);
	}
}
