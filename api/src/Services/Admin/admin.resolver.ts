import GenericResponse from "@Utils/Http/GenericResponse.type";
import { UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { PublicAdmin, RouterGuard } from "src/Guards/RouteGuard.guard";

import { CreateAdminDto } from "./Mutations/CreateAdmin/CreateAdmin.dto";
import { CreateAdminCommand } from "./Mutations/CreateAdmin/CreateAdminCommand";

@Resolver()
@UseGuards(RouterGuard)
export class AdminResolver {
	constructor(private readonly commandBus: CommandBus) {}

	@Mutation(() => GenericResponse)
	@PublicAdmin()
	async CreateAdmin(@Args("createAdminDto") createAdminDto: CreateAdminDto): Promise<GenericResponse> {
		return this.commandBus.execute(new CreateAdminCommand(createAdminDto));
	}
}
