import { Administrator } from "@Models/Administration/Administrator";
import SignInCredentials from "@Shared/Input/SignInCredentials";
import { SignInResponse } from "@Shared/Response/SignInResponse";
import JwtPayload from "@Utils/JWT/JwtPayload.interface";
import { ConflictException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { InjectEntityManager } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { validate } from "class-validator";
import { EntityManager } from "typeorm";

export class SignInCommand {
	constructor(public credentialsDto: SignInCredentials) {}
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

		const admin = await this.entityManager.findOne(Administrator, {
			where: { email: credentialsDto.email },
			relations: ["password"],
		});

		if (!admin) {
			throw new UnauthorizedException("Account doesn't exist. Create account.");
		}

		if (!admin.password || !(await bcrypt.compare(credentialsDto.password, admin.password.hash))) {
			throw new UnauthorizedException("Invalid credentials.");
		}

		const payload: JwtPayload = { id: admin.id, email: admin.email, adminRole: admin.adminRole };

		const accessToken = await this.jwtService.signAsync(payload, {
			secret: this.configService.get<string>("JWT_ADMIN_SECRET"),
			expiresIn: "24h",
		});

		const refreshToken = await this.jwtService.signAsync(payload, {
			secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
			expiresIn: "7d",
		});

		admin.refreshToken = refreshToken;
		await this.entityManager.save(admin);

		return new SignInResponse(accessToken, refreshToken);
	}
}
