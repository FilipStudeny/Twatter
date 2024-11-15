import GenericResponse from "@Shared/Response/GenericResponse";
import { CurrentUser } from "@Utils/JWT/CurrentUser";
import JwtPayload from "@Utils/JWT/JwtPayload.interface";
import { UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { RouterGuard } from "src/Guards/RouteGuard.guard";

import { CreateGroupDto } from "./Mutations/CreateGroup/CreateGroup.dto";
import { CreateGroupCommand } from "./Mutations/CreateGroup/CreateGroupCommand";

@Resolver()
@UseGuards(RouterGuard)
export default class GroupResolver {
	constructor(private readonly commandBus: CommandBus) {}

	@Mutation(() => GenericResponse)
	async createGroup(
		@Args("createGroupDto") createGroupDto: CreateGroupDto,
		@CurrentUser() payload: JwtPayload,
	): Promise<GenericResponse> {
		const { id: ownerId } = payload;
		const { name, interestId } = createGroupDto;

		const response = await this.commandBus.execute(new CreateGroupCommand(name, ownerId, interestId));
		return response;
	}
}
