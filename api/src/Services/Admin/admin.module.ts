/*
https://docs.nestjs.com/modules
*/

import { Administrator } from "@Models/Administration/Administrator";
import { Password } from "@Models/Password";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CreateAdminCommandHandler } from "./Mutations/CreateAdmin/CreateAdminCommand";
import { SignInCommandHandler } from "./Mutations/SignIn/SignInCommand";
import { AdminResolver } from "./admin.resolver";

@Module({
	imports: [
		CqrsModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>("JWT_ADMIN_SECRET"),
				signOptions: { expiresIn: "1h" },
			}),
		}),
		PassportModule.register({
			defaultStrategy: "admin-jwt",
		}),
		TypeOrmModule.forFeature([Administrator, Password]),
	],
	providers: [AdminResolver, CreateAdminCommandHandler, SignInCommandHandler],
})
export class AdminModule {}
