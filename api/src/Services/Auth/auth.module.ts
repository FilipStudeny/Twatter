/*
https://docs.nestjs.com/modules
*/

import { Password } from "@Models/Password";
import { User } from "@Models/User";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LogoutCommandHandler } from "./Mutations/Logout/LoggoutCommand";
import { RefreshTokenCommandHandler } from "./Mutations/RefreshToken/RefreshTokenCommand";
import { SignInCommandHandler } from "./Mutations/SignIn/SignInCommand";
import AuthResolver from "./auth.resolver";

@Module({
	imports: [
		CqrsModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>("JWT_SECRET"),
				signOptions: { expiresIn: "1h" },
			}),
		}),
		PassportModule.register({
			defaultStrategy: "jwt",
		}),
		TypeOrmModule.forFeature([User, Password]),
	],
	providers: [AuthResolver, SignInCommandHandler, RefreshTokenCommandHandler, LogoutCommandHandler],
})
export class AuthModule {}
