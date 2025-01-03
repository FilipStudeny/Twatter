import { Comment } from "@Models/Comment";
import { Post } from "@Models/Post";
import { Report } from "@Models/Report";
import { User } from "@Models/User";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CreateReportCommandHandler } from "./Mutations/CreateReport/CreateReportCommand";
import { ReportResolver } from "./report.resolver";

@Module({
	imports: [CqrsModule, ConfigModule, TypeOrmModule.forFeature([User, Post, Comment, Report])],
	providers: [ReportResolver, CreateReportCommandHandler],
})
export class ReportModule {}
