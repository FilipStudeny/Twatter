import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import { join } from "path";

import { EmailService } from "./email.service";

@Module({
	imports: [
		ConfigModule,
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				transport: {
					host: configService.get<string>("MAIL_HOST", "mailhog"),
					port: configService.get<number>("MAIL_PORT", 1025),
					secure: false,
					auth: null,
				},
				defaults: {
					from: '"Twatter Support" <no-reply@twatter.com>',
				},
				template: {
					dir: join(process.cwd(), "src", "Services", "Email", "Templates"),
					adapter: new PugAdapter(),
					options: {
						strict: true,
					},
				},
			}),
		}),
	],
	providers: [EmailService],
	exports: [EmailService],
})
export class EmailModule {}
