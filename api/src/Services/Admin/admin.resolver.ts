import { SignInResponse } from "@Services/Auth/Mutations/SignIn/SignInResponse";
import GenericResponse from "@Utils/Http/GenericResponse.type";
import { UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { PublicAdmin, RouterGuard } from "src/Guards/RouteGuard.guard";

import { CreateAdminDto } from "./Mutations/CreateAdmin/CreateAdmin.dto";
import { CreateAdminCommand } from "./Mutations/CreateAdmin/CreateAdminCommand";
import { SignInCommand } from "./Mutations/SignIn/SignInCommand";
import SignInCredentialsDto from "@Services/Auth/Mutations/SignIn/SignInCreadentials.dto";

@Resolver()
@UseGuards(RouterGuard)
export class AdminResolver {
	constructor(private readonly commandBus: CommandBus) {}

	@Mutation(() => SignInResponse)
	@PublicAdmin()
	async SignInAdmin(@Args("signIn") dto: SignInCredentialsDto): Promise<SignInResponse> {
		const response = await this.commandBus.execute(new SignInCommand(dto));
		return response;
	}

	@Mutation(() => GenericResponse)
	@PublicAdmin()
	async CreateAdmin(@Args("createAdminDto") createAdminDto: CreateAdminDto): Promise<GenericResponse> {
		return this.commandBus.execute(new CreateAdminCommand(createAdminDto));
	}
}
