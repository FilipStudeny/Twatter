import { Group } from "@Models/Group";
import { Interest } from "@Models/Interest";
import { Post } from "@Models/Post";
import { Reaction } from "@Models/Reaction";
import { User } from "@Models/User";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CreateGroupCommandHandler } from "./Mutations/CreateGroup/CreateGroupCommand";
import GroupResolver from "./group.resolver";

@Module({
	imports: [
		CqrsModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>("JWT_SECRET"),
				signOptions: { expiresIn: "1h" },
			}),
		}),
		PassportModule.register({
			defaultStrategy: "jwt",
		}),
		TypeOrmModule.forFeature([User, Interest, Group, Post, Reaction]),
	],
	providers: [GroupResolver, CreateGroupCommandHandler],
})
export class GroupModule {}
