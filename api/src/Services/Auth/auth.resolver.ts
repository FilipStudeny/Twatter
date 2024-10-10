import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { SignInCommand } from "./Mutations/SignIn/SignInCommand";
import SignInCredentialsDto from "./Mutations/SignIn/SignInCreadentials.dto";
import { SignInResponse } from "./Mutations/SignIn/SignInResponse";

@Resolver()
export default class AuthResolver {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	// eslint-disable-next-line class-methods-use-this
	@Query(() => String)
	hello(): string {
		return "Hello, World!";
	}

	@Mutation(() => SignInResponse)
	async SignIn(@Args("signIn") dto: SignInCredentialsDto): Promise<SignInResponse> {
		const response = await this.commandBus.execute(new SignInCommand(dto));
		return response;
	}
}
