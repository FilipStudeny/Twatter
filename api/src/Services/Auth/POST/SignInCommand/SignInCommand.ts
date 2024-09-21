import User from "@Models/User.entity";
import JwtPayload from "@Services/Auth/SHARED/JwtPayload.interface";
import { UnauthorizedException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { InjectEntityManager } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { EntityManager } from "typeorm";

export class SignInCommand {
	constructor(
		public password: string,
		public email: string,
	) {}
}

@CommandHandler(SignInCommand)
export class SignInCommandHandler implements ICommandHandler<SignInCommand> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		private readonly jwtService: JwtService,
	) {}

	async execute(command: SignInCommand): Promise<{ token: string }> {
		const { email, password } = command;

		const user = await this.entityManager.findOne(User, {
			where: { email },
			relations: ["password"],
		});

		if (!user) {
			throw new UnauthorizedException("Invalid credentials.");
		}

		if (!user.password || !(await bcrypt.compare(password, user.password.passwordHash))) {
			throw new UnauthorizedException("Invalid credentials.");
		}

		const payload: JwtPayload = { id: user.id, email: user.email };
		const token: string = this.jwtService.sign(payload);

		return { token };
	}
}
