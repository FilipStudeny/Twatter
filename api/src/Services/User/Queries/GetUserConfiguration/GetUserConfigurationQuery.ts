import { User } from "@Models/User";
import { UserConfiguration } from "@Models/UserConfiguration";
import UserConfigurationDetail from "@Shared/Response/UserConfigurationResponse";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

export class GetUserConfigurationQuery {
	constructor(public readonly userId: string) {}
}

@QueryHandler(GetUserConfigurationQuery)
export class GetUserConfigurationQueryHandler implements IQueryHandler<GetUserConfigurationQuery> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(query: GetUserConfigurationQuery): Promise<UserConfigurationDetail> {
		const { userId } = query;

		const user = await this.entityManager.findOne(User, {
			where: { id: userId },
			relations: ["configuration"],
		});

		if (!user) {
			throw new NotFoundException("User not found");
		}

		if (!user.configuration) {
			throw new NotFoundException("User configuration not found");
		}

		const configurationDetail = this.mapper.map(
			user.configuration,
			UserConfiguration,
			UserConfigurationDetail,
		);

		return configurationDetail;
	}
}
