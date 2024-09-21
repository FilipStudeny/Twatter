import Role from "@Models/Role.entity";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import handlers from "./handlers";
import RolesController from "./roles.controller";
import RolesService from "./roles.service";

@Module({
	imports: [CqrsModule, TypeOrmModule.forFeature([Role])],
	controllers: [RolesController],
	providers: [RolesService, ...handlers],
})
export default class RolesModule {}
