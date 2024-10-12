import { Entity, Column, OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";

import { BanStrike } from "./Administration/BanStrike";
import { BaseEntity } from "./BaseEntity";
import { Comment } from "./Comment";
import { Group } from "./Group";
import { Notification } from "./Notification";
import { Password } from "./Password";
import { Post } from "./Post";
import { Reaction } from "./Reaction";
import { Report } from "./Report";

@Entity()
export class User extends BaseEntity {
	@Column({ nullable: true })
	username: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column({ unique: true })
	email: string;

	@OneToOne(() => Password, (password) => password.id, { cascade: true })
	@JoinColumn()
	password: Password;

	@OneToMany(() => Post, (post) => post.creator)
	posts: Post[];

	@OneToMany(() => Comment, (comment) => comment.creator)
	comments: Comment[];

	@OneToMany(() => Reaction, (reaction) => reaction.user)
	reactions: Reaction[];

	@ManyToMany(() => Group, (group) => group.users)
	groups: Group[];

	@ManyToMany(() => User, (user) => user.friends)
	@JoinTable()
	friends: User[];

	@OneToMany(() => Notification, (notification) => notification.receiver)
	notifications: Notification[];

	@OneToMany(() => Notification, (notification) => notification.sender)
	sentNotifications: Notification[];

	@OneToMany(() => Report, (report) => report.reporter)
	reportsFiled: Report[];

	@OneToMany(() => Report, (report) => report.reportedUser)
	reportsAgainst: Report[];

	@OneToMany(() => BanStrike, (strike) => strike.user)
	banStrikes: BanStrike[];

	@Column({ unique: true, nullable: true })
	refreshToken: string;
}
