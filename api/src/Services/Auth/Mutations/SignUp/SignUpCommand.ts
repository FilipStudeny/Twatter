import { Password } from "@Models/Password";
import { User } from "@Models/User";
import { UserConfiguration } from "@Models/UserConfiguration";
import { EmailService } from "@Services/Email/email.service";
import GenericResponse from "@Shared/Response/GenericResponse";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { validate } from "class-validator";
import { EntityManager } from "typeorm";

import SignUpUserData from "./SignUpUserData";

export class SignUpCommand {
	constructor(public signUpUserData: SignUpUserData) {}
}

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@InjectMapper() private readonly mapper: Mapper,
		private readonly emailService: EmailService,
	) {}

	async execute(command: SignUpCommand): Promise<GenericResponse> {
		const { signUpUserData } = command;

		const errors = await validate(signUpUserData);
		if (errors.length > 0) {
			throw new ConflictException(
				`Validation failed: ${errors.map((error) => error.toString()).join(", ")}`,
			);
		}

		const user = this.mapper.map(signUpUserData, SignUpUserData, User);

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(signUpUserData.password, salt);

		const userPassword = new Password();
		userPassword.hash = hashedPassword;
		userPassword.salt = salt;

		user.password = userPassword;

		const userConfiguration = new UserConfiguration();
		user.configuration = userConfiguration;

		try {
			await this.entityManager.save(User, user);
			await this.emailService.sendRegistrationEmail(
				user.email,
				`${user.firstName} ${user.lastName}`,
				signUpUserData.password,
			);
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
