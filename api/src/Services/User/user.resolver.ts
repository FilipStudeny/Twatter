import GenericResponse from "@Utils/Http/GenericResponse.type";
import { CurrentUser } from "@Utils/JWT/CurrentUser";
import JwtPayload from "@Utils/JWT/JwtPayload.interface";
import { UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Args, ID, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { NoRoles, Public, Roles, RouterGuard } from "src/Guards/RouteGuard.guard";

import { CreateUserCommand } from "./Mutations/CreateUser/CreateUserCommand";
import CreateUserDto from "./Mutations/CreateUser/CreateUserDto.dto";
import { GetUserQuery } from "./Queries/GetUser/GetUserQuery";
import { GetUsersQuery } from "./Queries/GetUsers/GetUsersQuery";
import PaginatedUsersResponse from "./Queries/GetUsers/PaginatedUsersResponse.type";
import UserListItemDto from "./Shared/UserListItem.dto";
import AdminRole from "@Models/Enums/AdminRole";

@Resolver()
@UseGuards(RouterGuard)
export default class UserResolver {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	// eslint-disable-next-line class-methods-use-this
	@Query(() => String)
	hello(): string {
		return "Hello, World!";
	}

	@Public()
	@Query(() => UserListItemDto, { name: "user" })
	async getUser(
		@Args("id", { type: () => ID, nullable: true }) id?: string,
		@Args("username", { type: () => String, nullable: true }) username?: string,
		@Args("firstName", { type: () => String, nullable: true }) firstName?: string,
		@Args("lastName", { type: () => String, nullable: true }) lastName?: string,
	): Promise<UserListItemDto> {
		return this.queryBus.execute(new GetUserQuery(id, username, firstName, lastName));
	}

	@Query(() => PaginatedUsersResponse)
	@NoRoles()
	async getUsers(
		@Args("page", { type: () => Int, defaultValue: 1 }) page: number,
		@Args("limit", { type: () => Int, defaultValue: 10 }) limit: number,
		@CurrentUser() user: JwtPayload,
	) {
		return this.queryBus.execute(new GetUsersQuery(page, limit));
	}

	@Mutation(() => GenericResponse)
	async CreateUser(@Args("createUser") dto: CreateUserDto): Promise<GenericResponse> {
		const response = await this.commandBus.execute(new CreateUserCommand(dto));
		return response;
	}
}
