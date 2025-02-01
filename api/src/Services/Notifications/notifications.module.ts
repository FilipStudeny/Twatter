import { Notification } from "@Models/Notification";
import { User } from "@Models/User";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { NotificationsService } from "./notifications.service";

@Module({
	imports: [TypeOrmModule.forFeature([User, Notification])],
	controllers: [],
	providers: [NotificationsService],
	exports: [NotificationsService],
})
export class NotificationsModule {}
