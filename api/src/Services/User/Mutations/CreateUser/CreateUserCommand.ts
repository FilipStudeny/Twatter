import { Password } from "@Models/Password";
import { User } from "@Models/User";
import GenericResponse from "@Shared/Response/GenericResponse";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { validate } from "class-validator";
import { EntityManager } from "typeorm";

import CreateUserDto from "./CreateUserDto.dto";

export class CreateUserCommand {
	constructor(public createUserDto: CreateUserDto) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	async execute(command: CreateUserCommand): Promise<GenericResponse> {
		const { createUserDto } = command;

		const errors = await validate(createUserDto);
		if (errors.length > 0) {
			throw new ConflictException(
				`Validation failed: ${errors.map((error) => error.toString()).join(", ")}`,
			);
		}

		const user = this.mapper.map(createUserDto, CreateUserDto, User);

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

		const userPassword = new Password();
		userPassword.hash = hashedPassword;
		userPassword.salt = salt;

		user.password = userPassword;

		try {
			await this.entityManager.save(User, user);
			return new GenericResponse("User created successfully");
		} catch (error) {
			if (error.code === "23505") {
				throw new ConflictException("Email already exists.");
			} else {
				throw new InternalServerErrorException("Something went wrong. Please try again.");
			}
		}
	}
}
