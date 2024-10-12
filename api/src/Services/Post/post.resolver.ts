import GenericResponse from "@Utils/Http/GenericResponse.type";
import { CurrentUser } from "@Utils/JWT/CurrentUser";
import JwtPayload from "@Utils/JWT/JwtPayload.interface";
import { UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { RouterGuard } from "src/Guards/RouteGuard.guard";

import { CreatePostDto } from "./Mutations/CreatePost/CreatePost.dto";
import { CreatePostCommand } from "./Mutations/CreatePost/CreatePostCommand";

@Resolver()
@UseGuards(RouterGuard)
export default class PostsResolver {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Mutation(() => GenericResponse)
	async CreatePost(
		@Args("createPost") createPostDto: CreatePostDto,
		@CurrentUser() payload: JwtPayload,
	): Promise<GenericResponse> {
		const userId = payload.id;
		return this.commandBus.execute(new CreatePostCommand(createPostDto, userId));
	}
}
