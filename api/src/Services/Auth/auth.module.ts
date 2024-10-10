/*
https://docs.nestjs.com/modules
*/

import { Password } from "@Models/Password";
import { User } from "@Models/User";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SignInCommandHandler } from "./Mutations/SignIn/SignInCommand";
import AuthResolver from "./auth.resolver";

@Module({
	imports: [
		CqrsModule,
		JwtModule.register({
			secret: "yx1csa65d4aw98f41e9asfd5as61fd3y1f5d1a6w8f49ea74t9af4a6sf1y65x1vdy6dg49awe4g7h49j4d9",
			signOptions: {
				expiresIn: 3600,
			},
		}),
		PassportModule.register({
			defaultStrategy: "jwt",
		}),
		TypeOrmModule.forFeature([User, Password]),
	],
	providers: [AuthResolver, SignInCommandHandler],
})
export class AuthModule {}
