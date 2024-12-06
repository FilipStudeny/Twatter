import { Injectable, Logger } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
	private readonly logger = new Logger(EmailService.name);

	constructor(private readonly mailerService: MailerService) {}

	/**
	 * Sends a registration email to a newly registered user.
	 *
	 * @param email - The user's email address.
	 * @param username - The user's username or first name.
	 * @param password - The user's plain text password (or a generated one).
	 */
	async sendRegistrationEmail(email: string, username: string, password: string) {
		this.logger.log(`Attempting to send registration email to ${email}`);

		try {
			await this.mailerService.sendMail({
				to: email,
				subject: "Welcome to Twatter!",
				template: "register-user",
				context: {
					username,
					email,
					password,
				},
			});

			this.logger.log(`Registration email sent successfully to ${email}`);
		} catch (error) {
			this.logger.error(`Failed to send registration email to ${email}`, error.stack);
		}
	}

	async sendPasswordResetEmail(email: string, username: string, resetLink: string): Promise<void> {
		await this.mailerService.sendMail({
			to: email,
			subject: "Password reset",
			template: "forgotten-password",
			context: {
				username,
				resetLink,
			},
		});
	}

	async sendPasswordChangeNotification(email: string, username: string, password: string): Promise<void> {
		await this.mailerService.sendMail({
			to: email,
			subject: "Your Password Has Been Changed Successfully",
			template: "password-changed",
			context: {
				username,
				email,
				password,
			},
		});
	}
}
