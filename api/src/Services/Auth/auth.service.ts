import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";

import { CreateUserCommand } from "./POST/CreateUserCommand/CreateUserCommand";
import CreateUserDto from "./POST/CreateUserCommand/CreateUserDto";
import { SignInCommand } from "./POST/SignInCommand/SignInCommand";
import SignInCredentialsDto from "./POST/SignInCommand/SignInCredentialsDto";

@Injectable()
export default class AuthService {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	async createUser(dto: CreateUserDto): Promise<void> {
		const { email, firstName, lastName, password } = dto;
		return this.commandBus.execute(new CreateUserCommand(firstName, lastName, password, email));
	}

	async signIn(dto: SignInCredentialsDto): Promise<{ token: string }> {
		const { email, password } = dto;
		return this.commandBus.execute(new SignInCommand(password, email));
	}
}
