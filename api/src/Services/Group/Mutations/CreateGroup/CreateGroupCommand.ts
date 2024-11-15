import { Group } from "@Models/Group";
import { Interest } from "@Models/Interest";
import { User } from "@Models/User";
import GenericResponse from "@Shared/Response/GenericResponse";
import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

export class CreateGroupCommand {
	constructor(
		public readonly name: string,
		public readonly ownerId: string,
		public readonly interestId: string,
		public readonly moderatorIds?: string[],
		public readonly userIds?: string[],
	) {}
}

@CommandHandler(CreateGroupCommand)
export class CreateGroupCommandHandler implements ICommandHandler<CreateGroupCommand> {
	constructor(
		@InjectEntityManager()
		private readonly entityManager: EntityManager,
	) {}

	async execute(command: CreateGroupCommand): Promise<GenericResponse> {
		const { name, ownerId, interestId } = command;

		// Fetch the owner
		const owner = await this.entityManager.findOne(User, {
			where: { id: ownerId },
		});
		if (!owner) {
			throw new NotFoundException("Owner not found");
		}

		// Fetch the interest
		const interest = await this.entityManager.findOne(Interest, {
			where: { id: interestId },
		});
		if (!interest) {
			throw new NotFoundException("Interest not found");
		}

		// Create the group
		const group = new Group();
		group.name = name;
		group.owner = owner;
		group.interest = interest;

		// Save the group
		await this.entityManager.save(group);

		return new GenericResponse("Group created");
	}
}
