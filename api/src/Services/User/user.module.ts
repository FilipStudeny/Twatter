import User from "@Models/User.entity";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import handlers from "./handlers";
import UserController from "./user.controller";
import UserService from "./user.service";

@Module({
	imports: [CqrsModule, TypeOrmModule.forFeature([User])],
	controllers: [UserController],
	providers: [UserService, ...handlers],
})
export default class UserModule {}
