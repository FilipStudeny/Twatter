import SignInCredentials from "@Shared/Input/SignInCredentials";
import { SignInResponse } from "@Shared/Response/SignInResponse";
import GenericResponse from "@Shared/Response/GenericResponse";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { LogoutCommand } from "./Mutations/Logout/LoggoutCommand";
import { RefreshTokenCommand } from "./Mutations/RefreshToken/RefreshTokenCommand";
import { SignInCommand } from "./Mutations/SignIn/SignInCommand";

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
	async SignInUser(@Args("signInUser") dto: SignInCredentials): Promise<SignInResponse> {
		const response = await this.commandBus.execute(new SignInCommand(dto));
		return response;
	}

	@Mutation(() => SignInResponse)
	async refreshToken(@Args("refreshToken") refreshToken: string): Promise<SignInResponse> {
		const response = await this.commandBus.execute(new RefreshTokenCommand(refreshToken));
		return response;
	}

	@Mutation(() => GenericResponse)
	async logout(@Args("userId") userId: string): Promise<GenericResponse> {
		await this.commandBus.execute(new LogoutCommand(userId));
		return new GenericResponse("Logout successful");
	}
}
