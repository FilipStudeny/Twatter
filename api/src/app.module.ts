import Comment from "@Models/Comment.entity";
import Password from "@Models/Password.entity";
import Role from "@Models/Role.entity";
import Task from "@Models/Task.entity";
import Team from "@Models/Team.entity";
import User from "@Models/User.entity";
import UserStory from "@Models/UserStory.entity";
import UserTeam from "@Models/UserTeam.entity";
import AuthModule from "@Services/Auth/auth.module";
import RolesModule from "@Services/Roles/roles.module";
import UserModule from "@Services/User/user.module";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), "src/schema.gql"),
		}),
		AuthModule,
		CqrsModule,
		RolesModule,
		UserModule,

		TypeOrmModule.forRoot({
			type: "postgres",
			host: "localhost",
			port: 5432,
			username: "root",
			password: "root",
			database: "task-manager",
			synchronize: true,
			entities: [User, Comment, Password, Role, Task, Team, UserStory, UserTeam],
		}),
	],
})
export default class AppModule {}
