import { AdminNotification } from "@Models/Administration/AdministrationNotification";
import { Administrator } from "@Models/Administration/Administrator";
import { BanStrike } from "@Models/Administration/BanStrike";
import { Comment } from "@Models/Comment";
import { Group } from "@Models/Group";
import { Interest } from "@Models/Interest";
import { Notification } from "@Models/Notification";
import { Password } from "@Models/Password";
import { Post } from "@Models/Post";
import { Reaction } from "@Models/Reaction";
import { Report } from "@Models/Report";
import { User } from "@Models/User";
import EntityMapper from "@Utils/EntityMapper.mapper";
import { AdminJwtStrategy } from "@Utils/JWT/AdminJwtStrategy.strategy";
import JwtStrategy from "@Utils/JWT/JwtStrategy.strategy";
import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AdminModule } from "./Services/Admin/admin.module";
import { AuthModule } from "./Services/Auth/auth.module";
import { CommentModule } from "./Services/Comment/comment.module";
import { GroupModule } from "./Services/Group/group.module";
import { PostModule } from "./Services/Post/post.module";
import { ReactionModule } from "./Services/Reaction/reaction.module";
import { UserModule } from "./Services/User/user.module";

@Module({
	imports: [
		AdminModule,
		GroupModule,
		ReactionModule,
		CommentModule,
		PostModule,
		AuthModule,
		UserModule,
		CqrsModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: "postgres",
				host: configService.get<string>("DB_HOST"),
				port: configService.get<number>("DB_PORT"),
				username: configService.get<string>("DB_USERNAME"),
				password: configService.get<string>("DB_PASSWORD"),
				database: configService.get<string>("DB_DATABASE"),
				synchronize: configService.get<boolean>("DB_SYNCHRONIZE"),
				entities: [
					Comment,
					Group,
					Interest,
					Notification,
					Password,
					Post,
					Reaction,
					Report,
					User,
					AdminNotification,
					Administrator,
					BanStrike,
				],
			}),
		}),

		AutomapperModule.forRoot({
			strategyInitializer: classes(),
		}),

		// GRAPHQL
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: "schema.gql",
			context: ({ request, response }) => ({ request, response }),
		}),
	],
	providers: [EntityMapper, JwtStrategy, AdminJwtStrategy],
})
export default class AppModule {}
