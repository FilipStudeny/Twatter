import Role from "@Models/Role.entity";
import User from "@Models/User.entity";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

export class CreateRoleCommand {
	constructor(
		public readonly name: string,
		public readonly user: User,
	) {}
}

@CommandHandler(CreateRoleCommand)
export class CreateRoleCommandHandler implements ICommandHandler<CreateRoleCommand> {
	constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

	async execute(command: CreateRoleCommand): Promise<Role> {
		const { name } = command;

		console.log(command.user);
		const role = new Role();
		role.name = name;

		return this.entityManager.save(Role, role);
	}
}
