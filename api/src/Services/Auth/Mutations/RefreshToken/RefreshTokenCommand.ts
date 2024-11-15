import { User } from "@Models/User";
import { SignInResponse } from "@Shared/Response/SignInResponse";
import JwtPayload from "@Utils/JWT/JwtPayload.interface";
import { UnauthorizedException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { InjectEntityManager } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { EntityManager } from "typeorm";

export class RefreshTokenCommand {
	constructor(public readonly refreshToken: string) {}
}

@CommandHandler(RefreshTokenCommand)
@Injectable()
export class RefreshTokenCommandHandler implements ICommandHandler<RefreshTokenCommand> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async execute(command: RefreshTokenCommand): Promise<SignInResponse> {
		const { refreshToken } = command;

		let payload: JwtPayload;

		try {
			payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
				secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
			});
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				throw new UnauthorizedException("Refresh token expired.");
			} else {
				throw new UnauthorizedException("Invalid refresh token.");
			}
		}

		const user = await this.entityManager.findOne(User, { where: { id: payload.id } });

		if (!user || !user.refreshToken) {
			throw new UnauthorizedException("Invalid refresh token.");
		}

		const isRefreshTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);

		if (!isRefreshTokenValid) {
			throw new UnauthorizedException("Invalid refresh token.");
		}

		const newPayload: JwtPayload = { id: user.id, email: user.email };

		const accessToken = await this.jwtService.signAsync(newPayload, {
			secret: this.configService.get<string>("JWT_SECRET"),
			expiresIn: "24h",
		});

		const newRefreshToken = await this.jwtService.signAsync(newPayload, {
			secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
			expiresIn: "7d",
		});

		user.refreshToken = newRefreshToken;
		await this.entityManager.save(user);

		return new SignInResponse(accessToken, newRefreshToken);
	}
}
