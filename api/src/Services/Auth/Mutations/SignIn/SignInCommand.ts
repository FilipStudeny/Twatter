import { User } from "@Models/User";
import JwtPayload from "@Utils/JWT/JwtPayload.interface";
import { ConflictException, UnauthorizedException } from "@nestjs/common";
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
		const token: string = await this.jwtService.signAsync(payload, { expiresIn: "1h" });

		return new SignInResponse(token);
	}
}
