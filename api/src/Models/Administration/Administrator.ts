import { Entity, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import { Report } from "../Report";
import { Password } from "../Password";
import { AdminNotification } from "./AdministrationNotification";
import { BanStrike } from "./BanStrike";

@Entity()
export class Administrator extends BaseEntity {
	@Column()
	username: string;

	@Column()
	email: string;

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
