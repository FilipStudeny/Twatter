import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import NotificationType from "./Enums/NotificationType";
import { User } from "./User";

@Entity()
export class Notification extends BaseEntity {
	@Column()
	receiverId: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: "receiverId" })
	receiver: User;

	@Column()
	senderId: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: "senderId" })
	sender: User;

	@Column({
		type: "enum",
		enum: NotificationType,
	})
	type: NotificationType;

	@Column()
	message: string;

	@Column({ default: false })
	isRead: boolean;
}
