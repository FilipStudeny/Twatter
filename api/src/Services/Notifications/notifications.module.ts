import { Notification } from "@Models/Notification";
import { User } from "@Models/User";
import { EmailModule } from "@Services/Email/email.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import GetNotificationsQueryHandler from "./Queries/GetNotifications/GetNotificationsQuery";
import GetUnreadNotificationsCountQueryHandler from "./Queries/GetUnreadNotificationsCount/GetNotificationsCountQuery";
import NotificationsResolver from "./notifications.resolver";
import { NotificationsService } from "./notifications.service";

@Module({
	imports: [CqrsModule, ConfigModule, TypeOrmModule.forFeature([User, Notification]), EmailModule],
	controllers: [],
	providers: [
		NotificationsResolver,
		NotificationsService,
		GetUnreadNotificationsCountQueryHandler,
		GetNotificationsQueryHandler,
	],
	exports: [NotificationsService],
})
export class NotificationsModule {}
