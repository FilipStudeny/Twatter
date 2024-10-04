import Password from "@Models/Password.entity";
import User from "@Models/User.entity";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import GenericResponse from "@Services/Shared/Responses/GenericResponse.type";
import * as bcrypt from "bcrypt";
import { EntityManager } from "typeorm";

export class CreateUserCommand {
	constructor(
		public firstName: string,
		public lastName: string,
		public password: string,
		public email: string,
	) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
	constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

	async execute(command: CreateUserCommand): Promise<GenericResponse> {
		const { email, firstName, lastName, password } = command;

		const user = new User();
		user.firstName = firstName;
		user.lastName = lastName;
		user.email = email;

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const userPassword = new Password();
		userPassword.user = user;
		userPassword.passwordHash = hashedPassword;
		userPassword.salt = salt;

		user.password = userPassword;

		try {
			await this.entityManager.save(User, user);
			return new GenericResponse("User created successfully", this.constructor.name);
		} catch (error) {
			if (error.code === "23505") {
				throw new ConflictException("Email already exists.");
			} else {
				throw new InternalServerErrorException("Something went wrong. Please try again.");
			}
		}
	}
}
