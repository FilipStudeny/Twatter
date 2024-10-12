import { User } from "@Models/User";
import JwtPayload from "@Utils/JWT/JwtPayload.interface";
import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

import { SignInResponse } from "../SignIn/SignInResponse";

export class RefreshTokenCommand {
	constructor(public readonly refreshToken: string) {}
}

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenCommandHandler {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async execute(command: RefreshTokenCommand): Promise<SignInResponse> {
		const { refreshToken } = command;

		try {
			// Decode the refresh token to get the payload
			let payload: JwtPayload;
			try {
				payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
					secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
				});
			} catch {
				throw new UnauthorizedException("Invalid refresh token.");
			}

			const user = await this.entityManager.findOne(User, {
				where: { id: payload.id, refreshToken },
			});

			if (!user) {
				throw new UnauthorizedException("Invalid refresh token.");
			}

			const newPayload: JwtPayload = { id: user.id, email: user.email };

			const accessToken = await this.jwtService.signAsync(newPayload, {
				secret: this.configService.get<string>("JWT_SECRET"),
				expiresIn: "30s",
			});

			const newRefreshToken = await this.jwtService.signAsync(newPayload, {
				secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
				expiresIn: "7d",
			});

			user.refreshToken = newRefreshToken;
			await this.entityManager.save(user);

			return new SignInResponse(accessToken, newRefreshToken);
		} catch {
			throw new UnauthorizedException("Invalid refresh token.");
		}
	}
}
