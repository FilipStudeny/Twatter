import GenericResponse from "@Shared/Response/GenericResponse";
import { CurrentUser } from "@Utils/JWT/CurrentUser";
import JwtPayload from "@Utils/JWT/JwtPayload.interface";
import { UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { RouterGuard } from "src/Guards/RouteGuard.guard";

import { CreateOrUpdateReactionCommand } from "./Mutations/CreateOrUpdateReaction/CreateOrUpdateReactionCommand";
import { CreateOrUpdateReactionDto } from "./Mutations/CreateOrUpdateReaction/CreateReaction.dto";

@Resolver()
@UseGuards(RouterGuard)
export class ReactionsResolver {
	constructor(private readonly commandBus: CommandBus) {}

	@Mutation(() => GenericResponse)
	async AddReaction(
		@Args("createOrUpdateReactionData") createOrUpdateReactionData: CreateOrUpdateReactionDto,
		@CurrentUser() payload: JwtPayload,
	): Promise<GenericResponse> {
		return this.commandBus.execute(
			new CreateOrUpdateReactionCommand(payload.id, createOrUpdateReactionData),
		);
	}
}
