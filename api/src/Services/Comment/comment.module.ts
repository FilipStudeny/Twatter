/*
https://docs.nestjs.com/modules
*/

import { Comment } from "@Models/Comment";
import { Post } from "@Models/Post";
import { User } from "@Models/User";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CreateCommentCommandHandler } from "./Mutations/CreateComment/CreateCommentCommand";
import { PinCommentCommandHandler } from "./Mutations/PinComment/PinCommentCommand";
import GetPostCommentsQueryHandler from "./Queries/GetPostComments/GetPostCommentsQuery";
import CommentsResolver from "./comment.resolver";

@Module({
	imports: [CqrsModule, ConfigModule, TypeOrmModule.forFeature([User, Post, Comment])],
	providers: [
		CommentsResolver,
		CreateCommentCommandHandler,
		GetPostCommentsQueryHandler,
		PinCommentCommandHandler,
	],
})
export class CommentModule {}
