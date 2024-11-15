import SignInCredentials from "@Shared/Input/SignInCredentials";
import { SignInResponse } from "@Shared/Response/SignInResponse";
import GenericResponse from "@Shared/Response/GenericResponse";
import { UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { Public, PublicAdmin, RouterGuard } from "src/Guards/RouteGuard.guard";

import { CreateAdminDto } from "./Mutations/CreateAdmin/CreateAdmin.dto";
import { CreateAdminCommand } from "./Mutations/CreateAdmin/CreateAdminCommand";
import { SignInCommand } from "./Mutations/SignIn/SignInCommand";

@Resolver()
@UseGuards(RouterGuard)
export class AdminResolver {
	constructor(private readonly commandBus: CommandBus) {}

	@Mutation(() => SignInResponse)
	@PublicAdmin()
	@Public()
	async SignInAdmin(@Args("signIn") dto: SignInCredentials): Promise<SignInResponse> {
		const response = await this.commandBus.execute(new SignInCommand(dto));
		return response;
	}

	@Mutation(() => GenericResponse)
	@PublicAdmin()
	async CreateAdmin(@Args("createAdminDto") createAdminDto: CreateAdminDto): Promise<GenericResponse> {
		return this.commandBus.execute(new CreateAdminCommand(createAdminDto));
	}
}
