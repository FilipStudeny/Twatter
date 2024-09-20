import Role from "@Models/Role.entity";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import Password from "src/Models/Password.entity";
import User from "@Models/User.entity";

import { EntityManager } from "typeorm";

export class CreateUserCommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly roleIds: number[],
  ) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
	constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

	async execute(command: CreateUserCommand): Promise<User> {
		const { name, email, passwordHash, roleIds } = command;

		const user = new User();
		user.name = name;
		user.email = email;

		const password = new Password();
		password.passwordHash = passwordHash;
		password.user = user;

		const roles = await this.entityManager.findByIds(Role, roleIds);
		user.roles = roles;

		await this.entityManager.save(User, user);
		await this.entityManager.save(Password, password);

		return user;
	}
}