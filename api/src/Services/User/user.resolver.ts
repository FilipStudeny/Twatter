import GenericResponse from "@Shared/Response/GenericResponse";
import { UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Args, Info, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";
import * as graphqlFields from "graphql-fields";
import { Public, RouterGuard } from "src/Guards/RouteGuard.guard";

import { CreateUserCommand } from "./Mutations/CreateUser/CreateUserCommand";
import CreateUserDto from "./Mutations/CreateUser/CreateUserDto.dto";
import { GetUsersQuery } from "./Queries/GetUsers/GetUsersQuery";
import PaginatedUsersResponse from "./Queries/GetUsers/PaginatedUsersResponse.type";

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

	@Query(() => PaginatedUsersResponse)
	@Public()
	async getUsers(
		@Args("page", { type: () => Int, defaultValue: 1 }) page: number,
		@Args("limit", { type: () => Int, defaultValue: 10 }) limit: number,
		@Args("userId", { type: () => String, nullable: true }) userId: string,
		@Args("groupId", { type: () => String, nullable: true }) groupId: string,
		@Info() info: GraphQLResolveInfo,
	) {
		const fields = graphqlFields(info);
		return this.queryBus.execute(new GetUsersQuery(page, limit, fields.items, userId, groupId));
	}

	@Mutation(() => GenericResponse)
	async CreateUser(@Args("createUser") dto: CreateUserDto): Promise<GenericResponse> {
		const response = await this.commandBus.execute(new CreateUserCommand(dto));
		return response;
	}
}
