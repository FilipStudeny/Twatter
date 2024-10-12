// LogoutCommandHandler.ts
import { User } from "@Models/User";
import { CommandHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

export class LogoutCommand {
	constructor(public readonly userId: string) {}
}

@CommandHandler(LogoutCommand)
export class LogoutCommandHandler {
	constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

	async execute(command: LogoutCommand): Promise<void> {
		const { userId } = command;
		const user = await this.entityManager.findOne(User, { where: { id: userId } });

		if (user) {
			user.refreshToken = null;
			await this.entityManager.save(user);
		}
	}
}
