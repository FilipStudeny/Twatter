import { Password } from "@Models/Password";
import { User } from "@Models/User";
import { NotificationsModule } from "@Services/Notifications/notifications.module";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AddFriendRequestCommandHandler } from "./Mutations/AddFriendRequest/AddFriendRequestCommand";
import { UpdateFriendCommandHandler } from "./Mutations/UpdateFriend/UpdateFriendCommand";
import { UpdateUserConfigurationCommandHandler } from "./Mutations/UpdateUserConfiguration/UpdateUserConfiguration";
import { GetUserConfigurationQueryHandler } from "./Queries/GetUserConfiguration/GetUserConfigurationQuery";
import GetUsersQueryHandler from "./Queries/GetUsers/GetUsersQuery";
import UserResolver from "./user.resolver";

@Module({
	imports: [
		CqrsModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>("JWT_SECRET"),
			}),
		}),
		PassportModule.register({
			defaultStrategy: "jwt",
		}),
		TypeOrmModule.forFeature([User, Password]),
		NotificationsModule,
	],
	providers: [
		UserResolver,
		GetUsersQueryHandler,
		UpdateUserConfigurationCommandHandler,
		GetUserConfigurationQueryHandler,
		UpdateFriendCommandHandler,
		AddFriendRequestCommandHandler,
	],
})
export class UserModule {}
