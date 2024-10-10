import { BaseEntity } from "@Models/BaseEntity";
import { User } from "@Models/User";
import { Entity, Column, ManyToOne } from "typeorm";
import { Administrator } from "./Administrator";
import { Report } from "@Models/Report";
import { Post } from "@Models/Post";
import { Comment } from "@Models/Comment";
import StrikeAction from "@Models/Enums/StrikeAction";


@Entity()
export class BanStrike extends BaseEntity {
    
	@ManyToOne(() => User, (user) => user.banStrikes)
	user: User;

	@ManyToOne(() => Administrator, (admin) => admin.issuedStrikes)
	issuedBy: Administrator;

	@ManyToOne(() => Report, (report) => report.strikes)
	report: Report;

	@ManyToOne(() => Post, (post) => post.strikes, { nullable: true })
	post: Post;

	@ManyToOne(() => Comment, (comment) => comment.strikes, { nullable: true })
	comment: Comment;

	@Column()
	reason: string;

	@Column({
		type: "enum",
		enum: StrikeAction,
	})
	actionTaken: StrikeAction;

	@Column({ default: () => "CURRENT_TIMESTAMP" })
	dateIssued: Date;
}
