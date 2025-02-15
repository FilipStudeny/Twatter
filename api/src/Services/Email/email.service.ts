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
	 * @returns A promise that resolves once the email has been sent.
	 */
	async sendRegistrationEmail(email: string, username: string, password: string): Promise<void> {
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

	/**
	 * Sends a password reset email to a user who has requested a password reset.
	 *
	 * @param email - The user's email address where the reset link will be sent.
	 * @param username - The user's username or display name.
	 * @param resetLink - The URL link that allows the user to reset their password.
	 * @returns A promise that resolves once the email has been sent.
	 */
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

	/**
	 * Sends a notification email to a user confirming that their password has been successfully changed.
	 *
	 * @param email - The user's email address where the notification will be sent.
	 * @param username - The user's username or display name.
	 * @param password - The user's new password (plain text).
	 * @returns A promise that resolves once the email has been sent.
	 */
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

	/**
	 * Sends a notification email to a user confirming that they have received a friend request.
	 *
	 * @param email - The recipient's email address where the notification will be sent.
	 * @param username - The sender's username or display name (if available).
	 * @param firstName - The sender's first name.
	 * @param lastName - The sender's last name.
	 * @param profilePicture - The URL of the sender's profile picture.
	 * @param userUrl - The URL to view the sender's profile.
	 * @returns A promise that resolves once the email has been sent.
	 */
	async sendFriendRequest(
		email: string,
		username: string | undefined,
		firstName: string,
		lastName: string,
		profilePictureUrl: string,
		userUrl: string,
	): Promise<void> {
		try {
			await this.mailerService.sendMail({
				to: email,
				subject: `${username ?? `${firstName} ${lastName}`} has sent you a friend request`,
				template: "friend-request",
				context: {
					username,
					email,
					firstName,
					lastName,
					profilePictureUrl,
					userUrl,
				},
			});

			this.logger.log(`Friend request email sent successfully to ${email}`);
		} catch (error) {
			this.logger.error(`Failed to send friend request email to ${email}`, error.stack);
		}
	}
}
