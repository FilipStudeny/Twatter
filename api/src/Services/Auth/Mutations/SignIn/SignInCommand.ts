import { User } from "@Models/User";
import JwtPayload from "@Utils/JWT/JwtPayload.interface";
import { ConflictException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { InjectEntityManager } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { validate } from "class-validator";
import { EntityManager } from "typeorm";

import SignInCredentialsDto from "./SignInCreadentials.dto";
import { SignInResponse } from "./SignInResponse";

export class SignInCommand {
	constructor(public credentialsDto: SignInCredentialsDto) {}
}

@CommandHandler(SignInCommand)
export class SignInCommandHandler {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async execute(command: SignInCommand): Promise<SignInResponse> {
		const { credentialsDto } = command;

		const errors = await validate(credentialsDto);
		if (errors.length > 0) {
			throw new ConflictException(
				`Validation failed: ${errors.map((error) => error.toString()).join(", ")}`,
			);
		}

		const user = await this.entityManager.findOne(User, {
			where: { email: credentialsDto.email },
			relations: ["password"],
		});

		if (!user) {
			throw new UnauthorizedException("Account doesn't exist. Create account.");
		}

		if (!user.password || !(await bcrypt.compare(credentialsDto.password, user.password.hash))) {
			throw new UnauthorizedException("Invalid credentials.");
		}

		const payload: JwtPayload = { id: user.id, email: user.email };

		const accessToken = await this.jwtService.signAsync(payload, {
			secret: this.configService.get<string>("JWT_SECRET"),
			expiresIn: "24h",
		});

		const refreshToken = await this.jwtService.signAsync(payload, {
			secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
			expiresIn: "7d",
		});

		user.refreshToken = refreshToken;
		await this.entityManager.save(user);

		return new SignInResponse(accessToken, refreshToken);
	}
}
