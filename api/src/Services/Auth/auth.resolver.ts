import SignInCredentials from "@Shared/Input/SignInCredentials";
import GenericResponse from "@Shared/Response/GenericResponse";
import { SignInResponse } from "@Shared/Response/SignInResponse";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { ForgotPasswordCommand } from "./Mutations/ForgottenPassword/ForgottenPasswordCommand";
import { LogoutCommand } from "./Mutations/Logout/LoggoutCommand";
import { RefreshTokenCommand } from "./Mutations/RefreshToken/RefreshTokenCommand";
import { ResetPasswordCommand } from "./Mutations/ResetPassword/ResetPasswordCommand";
import { ResetPasswordInput } from "./Mutations/ResetPassword/ResetPasswordInput";
import { SignInCommand } from "./Mutations/SignIn/SignInCommand";
import { SignUpCommand } from "./Mutations/SignUp/SignUpCommand";
import SignUpUserData from "./Mutations/SignUp/SignUpUserData";

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

	@Mutation(() => GenericResponse)
	async SignUpUser(@Args("signUp") dto: SignUpUserData): Promise<GenericResponse> {
		const response = await this.commandBus.execute(new SignUpCommand(dto));
		return response;
	}

	@Mutation(() => SignInResponse)
	async refreshToken(@Args("refreshToken") refreshToken: string): Promise<SignInResponse> {
		const response = await this.commandBus.execute(new RefreshTokenCommand(refreshToken));
		return response;
	}

	@Mutation(() => GenericResponse)
	async SignOutUser(@Args("userId") userId: string): Promise<GenericResponse> {
		await this.commandBus.execute(new LogoutCommand(userId));
		return new GenericResponse("Logout successful");
	}

	@Mutation(() => GenericResponse)
	async forgotPassword(@Args("email") email: string): Promise<GenericResponse> {
		const response = await this.commandBus.execute(new ForgotPasswordCommand(email));
		return response;
	}

	@Mutation(() => GenericResponse)
	async resetPassword(@Args("resetPassword") data: ResetPasswordInput): Promise<GenericResponse> {
		const response = await this.commandBus.execute(new ResetPasswordCommand(data));
		return response;
	}
}
