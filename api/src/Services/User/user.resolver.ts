import GenericResponse from "@Services/Shared/Responses/GenericResponse.type";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";

import { CreateUserCommand } from "./Mutations/CreateUser/CreateUserCommand";
import CreateUserDto from "./Mutations/CreateUser/CreateUserDto";
import { GetUsersQuery } from "./Queries/GetUsers/GetUsersQuery";
import PaginatedUsersResponse from "./Queries/GetUsers/PaginatedUserResponse.dto";
import { GetUserQuery } from "./Queries/GetUser/GetUserQuery";
import UserListItemDto from "./Queries/GetUsers/UserListItem.dto";

@Resolver()
export default class UserResolver {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Query((returns) => String)
	hello(): string {
		return "Hello, World!";
	}

	// "fd65099b-c68d-4354-bcb2-de2c0341909a"

	@Query((returns) => UserListItemDto)
	async getUser(@Args("id") id: string): Promise<UserListItemDto> {
		const user = await this.queryBus.execute(new GetUserQuery(id));
		console.log(user);
		return user;
	}

	@Query(() => PaginatedUsersResponse)
	async getUsers(
		@Args("page", { type: () => Int, defaultValue: 1 }) page: number,
		@Args("limit", { type: () => Int, defaultValue: 10 }) limit: number,
	) {
		const t = await this.queryBus.execute(new GetUsersQuery(page, limit));
		console.log(t);
		return t;
	}

	@Mutation(() => GenericResponse)
	async CreateUser(@Args("createUser") dto: CreateUserDto): Promise<GenericResponse> {
		const { email, firstName, lastName, password } = dto;
		const response = await this.commandBus.execute(
			new CreateUserCommand(firstName, lastName, password, email),
		);
		return response;
	}
}
