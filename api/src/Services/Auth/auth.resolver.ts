import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { SignInCommand } from "./Mutations/SignIn/SignInCommand";
import SignInCredentialsDto from "./Mutations/SignIn/SignInCreadentials.dto";
import { SignInResponse } from "./Mutations/SignIn/SignInResponse";
import GenericResponse from "@Utils/Http/GenericResponse.type";
import { LogoutCommand } from "./Mutations/Logout/LoggoutCommand";
import { RefreshTokenCommand } from "./Mutations/RefreshToken/RefreshTokenCommand";

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

	@Mutation(() => SignInResponse)
	async refreshToken(@Args("refreshToken") refreshToken: string): Promise<SignInResponse> {
		const response = await this.commandBus.execute(new RefreshTokenCommand(refreshToken));
		return response;
	}

	@Mutation(() => GenericResponse)
	async logout(@Args("userId") userId: string): Promise<GenericResponse> {
		await this.commandBus.execute(new LogoutCommand(userId));
		return new GenericResponse("Logout successful", "LogoutResponse");
	}
}
