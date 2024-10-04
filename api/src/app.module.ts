import Comment from "@Models/Comment.entity";
import Password from "@Models/Password.entity";
import Role from "@Models/Role.entity";
import Task from "@Models/Task.entity";
import Team from "@Models/Team.entity";
import User from "@Models/User.entity";
import UserStory from "@Models/UserStory.entity";
import UserTeam from "@Models/UserTeam.entity";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";

import UserModule from "./Services/user/user.module";
import AuthModule from "./services/auth/auth.module";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";
import EntityMapper from "./app.mapper";

@Module({
	imports: [
		UserModule,
		AuthModule,
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
				entities: [User, Comment, Password, Role, Task, Team, UserStory, UserTeam],
			}),
		}),

		AutomapperModule.forRoot({
			strategyInitializer: classes(),
		}),

		// GRAPHQL
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: "schema.gql",
			context: ({ request }) => ({ request }),
		}),
	],
	providers: [EntityMapper],
})
export default class AppModule {}
