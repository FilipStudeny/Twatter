import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import NotificationType from "./Enums/NotificationType";

@Entity()
export class Notification extends BaseEntity {
	
	@ManyToOne(() => User, (user) => user.notifications)
	receiver: User;

	@ManyToOne(() => User, (user) => user.sentNotifications, { nullable: true })
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

	@Column({ nullable: true })
	relatedEntityId: string;
}
