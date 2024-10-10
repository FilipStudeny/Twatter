import { Entity, Column, ManyToOne } from "typeorm";
import { Administrator } from "./Administrator";
import NotificationType from "@Models/Enums/NotificationType";
import { BaseEntity } from "@Models/BaseEntity";

@Entity()
export class AdminNotification extends BaseEntity {
	@ManyToOne(() => Administrator, (admin) => admin.notifications)
	administrator: Administrator;

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
	senderId: string;

	@Column({ nullable: true })
	reportedPostId: string;

	@Column({ nullable: true })
	reportedCommentId: string;

	@Column({ nullable: true })
	reportedUserId: string;
}
