import { Password } from "@Models/Password";
import { User } from "@Models/User";
import { EmailService } from "@Services/Email/email.service";
import GenericResponse from "@Shared/Response/GenericResponse";
import { ConflictException, NotFoundException, Logger, Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { Redis } from "ioredis";
import { EntityManager } from "typeorm";

import { ResetPasswordInput } from "./ResetPasswordInput";

export class ResetPasswordCommand {
	constructor(public readonly resetPasswordData: ResetPasswordInput) {}
}

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordCommandHandler implements ICommandHandler<ResetPasswordCommand> {
	private readonly logger = new Logger(ResetPasswordCommandHandler.name);

	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@Inject("REDIS_CLIENT") private readonly redis: Redis,
		private readonly emailService: EmailService,
	) {}

	async execute(command: ResetPasswordCommand): Promise<GenericResponse> {
		const { email, token, newPassword } = command.resetPasswordData;

		this.logger.log(`Attempting password reset for email: ${email}`);

		// Retrieve and verify the token from Redis
		const redisKey = `password_reset:${email}`;
		const storedHashedToken = await this.redis.get(redisKey);

		if (!storedHashedToken) {
			this.logger.warn(`Invalid or expired reset token for email: ${email}`);
			throw new ConflictException("Invalid or expired reset token.");
		}

		// Hash the provided token and compare with the stored hash
		const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
		if (storedHashedToken !== hashedToken) {
			this.logger.warn(`Token mismatch for email: ${email}`);
			throw new ConflictException("Invalid or expired reset token.");
		}

		// Find the user in the database
		const user = await this.entityManager.findOne(User, { where: { email } });
		if (!user) {
			this.logger.warn(`User not found for email: ${email}`);
			throw new NotFoundException("User not found.");
		}

		// Hash the new password and update the user's password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);

		const newUserPassword = new Password();
		newUserPassword.hash = hashedPassword;
		newUserPassword.salt = salt;

		try {
			user.password = newUserPassword;
			await this.entityManager.save(user);

			// Delete the token from Redis
			await this.redis.del(redisKey);
			this.logger.log(`Sending new sign in credentials for email: ${email}`);
			await this.emailService.sendPasswordChangeNotification(
				user.email,
				`${user.firstName} ${user.lastName}`,
				newPassword,
			);
			this.logger.log(`Password reset successfully for email: ${email}`);
			return new GenericResponse("Password has been reset successfully.");
		} catch (error) {
			this.logger.error(`Failed to reset password for email: ${email}`, error.stack);
			throw new ConflictException("An error occurred while resetting the password.");
		}
	}
}
