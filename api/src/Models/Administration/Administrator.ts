import AdminRole from "@Models/Enums/AdminRole";
import { Entity, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";

import { BaseEntity } from "../BaseEntity";
import { Password } from "../Password";
import { Report } from "../Report";
import { AdminNotification } from "./AdministrationNotification";
import { BanStrike } from "./BanStrike";

@Entity()
export class Administrator extends BaseEntity {
	@Column({ unique: true })
	username: string;

	@Column({ unique: true })
	email: string;

	@Column({
		type: "enum",
		enum: AdminRole,
		default: AdminRole.MODERATOR,
	})
	adminRole: AdminRole;

	@OneToOne(() => Password, (password) => password.id, { cascade: true })
	@JoinColumn()
	password: Password;

	@OneToMany(() => Report, (report) => report.administrator)
	assignedReports: Report[];

	@OneToMany(() => AdminNotification, (notification) => notification.administrator)
	notifications: AdminNotification[];

	@OneToMany(() => BanStrike, (strike) => strike.issuedBy)
	issuedStrikes: BanStrike[];
}
