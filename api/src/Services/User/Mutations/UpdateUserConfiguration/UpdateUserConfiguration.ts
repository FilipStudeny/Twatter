import { User } from "@Models/User";
import { UserConfiguration } from "@Models/UserConfiguration";
import GenericResponse from "@Shared/Response/GenericResponse";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

import { UpdateUserConfigurationDto } from "./UpdateUserConfiguration.dto";

export class UpdateUserConfigurationCommand {
	constructor(
		public readonly updateDto: UpdateUserConfigurationDto,
		public readonly userId: string,
	) {}
}

@CommandHandler(UpdateUserConfigurationCommand)
export class UpdateUserConfigurationCommandHandler implements ICommandHandler<UpdateUserConfigurationCommand> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(command: UpdateUserConfigurationCommand): Promise<GenericResponse> {
		const { updateDto, userId } = command;
		const user = await this.entityManager.findOne(User, {
			where: { id: userId },
			relations: ["configuration"],
		});

		if (!user) {
			throw new NotFoundException("User not found");
		}

		let { configuration } = user;
		if (!configuration) {
			configuration = this.entityManager.create(UserConfiguration, {
				user,
			});
		}

		if (updateDto.profileBackgroundColor1) {
			configuration.profileBackgroundColor1 = updateDto.profileBackgroundColor1;
		}
		if (updateDto.profileBackgroundColor2) {
			configuration.profileBackgroundColor2 = updateDto.profileBackgroundColor2;
		}
		if (updateDto.friendRequest_Email_Notification !== undefined) {
			configuration.friendRequest_Email_Notification = updateDto.friendRequest_Email_Notification;
		}
		if (updateDto.friendRequest_App_Notification !== undefined) {
			configuration.friendRequest_App_Notification = updateDto.friendRequest_App_Notification;
		}
		if (updateDto.postReactedTo_Email_Notification !== undefined) {
			configuration.postReactedTo_Email_Notification = updateDto.postReactedTo_Email_Notification;
		}
		if (updateDto.postReactedTo_App_Notification !== undefined) {
			configuration.postReactedTo_App_Notification = updateDto.postReactedTo_App_Notification;
		}
		if (updateDto.commentReactedTo_Email_Notification !== undefined) {
			configuration.commentReactedTo_Email_Notification =
				updateDto.commentReactedTo_Email_Notification;
		}
		if (updateDto.commentReactedTo_App_Notification !== undefined) {
			configuration.commentReactedTo_App_Notification = updateDto.commentReactedTo_App_Notification;
		}

		if (updateDto.profileBackgroundLightAngle !== undefined) {
			configuration.profileBackgroundLightAngle = updateDto.profileBackgroundLightAngle;
		}

		if (updateDto.profileVisibility !== undefined) {
			configuration.profileVisibility = updateDto.profileVisibility;
		}

		try {
			await this.entityManager.save(UserConfiguration, configuration);
			if (!user.configuration) {
				user.configuration = configuration;
				await this.entityManager.save(User, user);
			}

			return new GenericResponse("Account settings updated successfully");
		} catch (error) {
			if (error.code === "23503") {
				throw new NotFoundException("Invalid foreign key provided.");
			}
			throw new InternalServerErrorException("Something went wrong. Please try again.");
		}
	}
}
