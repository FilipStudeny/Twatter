import { AuthModule } from "./Services/Auth/auth.module";
import Comment from "@Models/Comment.entity";
import Password from "@Models/Password.entity";
import Role from "@Models/Role.entity";
import Task from "@Models/Task.entity";
import Team from "@Models/Team.entity";
import User from "@Models/User.entity";
import UserStory from "@Models/UserStory.entity";
import UserTeam from "@Models/UserTeam.entity";
import RolesController from "@Services/Roles/roles.controller";
import RolesModule from "@Services/Roles/roles.module";
import RolesService from "@Services/Roles/roles.service";
import UserController from "@Services/User/user.controller";
import UserModule from "@Services/User/user.module";
import UserService from "@Services/User/user.service";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [
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
	providers: [RolesService, UserService],
	controllers: [RolesController, UserController],
})
export default class AppModule {}
