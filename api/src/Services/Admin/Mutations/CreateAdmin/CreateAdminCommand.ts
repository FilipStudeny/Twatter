import { Administrator } from "@Models/Administration/Administrator";
import { Password } from "@Models/Password";
import GenericResponse from "@Utils/Http/GenericResponse.type";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { validate } from "class-validator";
import { EntityManager } from "typeorm";

import { CreateAdminDto } from "./CreateAdmin.dto";

export class CreateAdminCommand {
	constructor(public readonly createAdminDto: CreateAdminDto) {}
}

@CommandHandler(CreateAdminCommand)
export class CreateAdminCommandHandler implements ICommandHandler<CreateAdminCommand> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(command: CreateAdminCommand): Promise<GenericResponse> {
		const { createAdminDto } = command;

		const errors = await validate(createAdminDto);
		if (errors.length > 0) {
			throw new ConflictException(
				`Validation failed: ${errors.map((error) => error.toString()).join(", ")}`,
			);
		}

		const admin = this.mapper.map(createAdminDto, CreateAdminDto, Administrator);

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(createAdminDto.password, salt);

		const adminPassword = new Password();
		adminPassword.hash = hashedPassword;
		adminPassword.salt = salt;

		admin.password = adminPassword;

		try {
			await this.entityManager.save(Administrator, admin);
			return new GenericResponse("Administrator created successfully", this.constructor.name);
		} catch (error) {
			if (error.code === "23505") {
				// Unique constraint error
				throw new ConflictException("Email already exists.");
			} else {
				throw new InternalServerErrorException("Something went wrong. Please try again.");
			}
		}
	}
}
