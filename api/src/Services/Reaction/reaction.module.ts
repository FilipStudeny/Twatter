/*
https://docs.nestjs.com/modules
*/

import { Comment } from "@Models/Comment";
import { Post } from "@Models/Post";
import { Reaction } from "@Models/Reaction";
import { User } from "@Models/User";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CreateOrUpdateReactionCommandHandler } from "./Mutations/CreateOrUpdateReaction/CreateOrUpdateReactionCommand";
import { GetUserReactionsQueryHandler } from "./Queries/GetUserReactions/GetUserReactionsQuery";
import { ReactionsResolver } from "./reaction.resolver";

@Module({
	imports: [CqrsModule, ConfigModule, TypeOrmModule.forFeature([User, Post, Comment, Reaction])],
	providers: [ReactionsResolver, CreateOrUpdateReactionCommandHandler, GetUserReactionsQueryHandler],
})
export class ReactionModule {}
