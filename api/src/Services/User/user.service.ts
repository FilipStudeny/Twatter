import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateUserCommand } from "./POST/CreateUserCommand/CreateUserCommand";
import CreateUserDTO from "./POST/CreateUserCommand/CreateUserDto";

@Injectable()
export default class UserService {
	constructor(private commandBus: CommandBus) {}

	async createUser(createUserDto: CreateUserDTO) {
		const { name, email, passwordHash, roleIds } = createUserDto;
		return this.commandBus.execute(new CreateUserCommand(name, email, passwordHash, roleIds));
	}
}
