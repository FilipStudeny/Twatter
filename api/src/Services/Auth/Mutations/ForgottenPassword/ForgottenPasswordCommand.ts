import { User } from "@Models/User";
import { EmailService } from "@Services/Email/email.service";
import GenericResponse from "@Shared/Response/GenericResponse";
import { NotFoundException, InternalServerErrorException, Logger, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import * as crypto from "crypto";
import { Redis } from "ioredis";
import { EntityManager } from "typeorm";

export class ForgotPasswordCommand {
	constructor(public readonly email: string) {}
}

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordCommandHandler implements ICommandHandler<ForgotPasswordCommand> {
	private readonly logger = new Logger(ForgotPasswordCommandHandler.name);

	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		@Inject("REDIS_CLIENT") private readonly redis: Redis,
		private readonly emailService: EmailService,
		private readonly configService: ConfigService,
	) {}

	async execute(command: ForgotPasswordCommand): Promise<GenericResponse> {
		const { email } = command;

		const user = await this.entityManager.findOne(User, { where: { email } });
		if (!user) {
			this.logger.warn(`Password reset requested for non-existent email: ${email}`);
			throw new NotFoundException("User with this email does not exist.");
		}

		try {
			// Generate a unique reset token
			const rawToken = crypto.randomBytes(32).toString("hex");
			const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
			const redisKey = `password_reset:${email}`;

			// Get token expiration from environment or use default (30 minutes)
			const tokenExpiration = this.configService.get<number>(
				"PASSWORD_RESET_TOKEN_EXPIRATION",
				30 * 60,
			);

			// Store the hashed token in Redis with an expiration
			await this.redis.set(redisKey, hashedToken, "EX", tokenExpiration);

			// Generate the reset link
			const domain = this.configService.get<string>("FRONTEND_DOMAIN", "https://localhost");
			const resetLink = `${domain}/reset-password?token=${rawToken}&email=${email}`;

			// Send reset email
			await this.emailService.sendPasswordResetEmail(email, user.firstName, resetLink);

			this.logger.log(`Password reset link sent to: ${email}`);
			return new GenericResponse("Password reset link has been sent to your email.");
		} catch (error) {
			this.logger.error(`Error processing password reset for email: ${email}`, error.stack);

			throw new InternalServerErrorException("An error occurred while processing your request.");
		}
	}
}
