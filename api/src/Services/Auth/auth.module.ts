/*
https://docs.nestjs.com/modules
*/

import { Password } from "@Models/Password";
import { User } from "@Models/User";
import { EmailModule } from "@Services/Email/email.module";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ForgotPasswordCommandHandler } from "./Mutations/ForgottenPassword/ForgottenPasswordCommand";
import { LogoutCommandHandler } from "./Mutations/Logout/LoggoutCommand";
import { RefreshTokenCommandHandler } from "./Mutations/RefreshToken/RefreshTokenCommand";
import { ResetPasswordCommandHandler } from "./Mutations/ResetPassword/ResetPasswordCommand";
import { SignInCommandHandler } from "./Mutations/SignIn/SignInCommand";
import { SignUpCommandHandler } from "./Mutations/SignUp/SignUpCommand";
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
			}),
		}),
		PassportModule.register({
			defaultStrategy: "jwt",
		}),
		TypeOrmModule.forFeature([User, Password]),
		EmailModule,
	],
	providers: [
		AuthResolver,
		SignInCommandHandler,
		RefreshTokenCommandHandler,
		LogoutCommandHandler,
		SignUpCommandHandler,
		ResetPasswordCommandHandler,
		ForgotPasswordCommandHandler,
	],
})
export class AuthModule {}
