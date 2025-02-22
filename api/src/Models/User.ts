import { Entity, Column, OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";

import { BanStrike } from "./Administration/BanStrike";
import { BaseEntity } from "./BaseEntity";
import { Comment } from "./Comment";
import { Group } from "./Group";
import { Password } from "./Password";
import { Post } from "./Post";
import { Reaction } from "./Reaction";
import { Report } from "./Report";
import { UserConfiguration } from "./UserConfiguration";

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

	@Column({ nullable: true })
	profilePictureUrl: string;

	@OneToOne(() => Password, (password) => password.id, { cascade: true })
	@JoinColumn()
	password: Password;

	@OneToMany(() => Post, (post) => post.creator, { cascade: true })
	posts: Post[];

	@OneToMany(() => Comment, (comment) => comment.creator)
	comments: Comment[];

	@OneToMany(() => Reaction, (reaction) => reaction.user)
	reactions: Reaction[];

	@OneToMany(() => Group, (group) => group.owner)
	createdGroups: Group[];

	@ManyToMany(() => Group, (group) => group.moderators)
	moderatedGroups: Group[];

	@ManyToMany(() => Group, (group) => group.users)
	groups: Group[];

	@ManyToMany(() => User, (user) => user.friends)
	@JoinTable()
	friends: User[];

	@OneToMany(() => Report, (report) => report.reporter)
	reportsFiled: Report[];

	@OneToMany(() => Report, (report) => report.reportedUser)
	reportsAgainst: Report[];

	@OneToMany(() => BanStrike, (strike) => strike.user)
	banStrikes: BanStrike[];

	@Column({ unique: true, nullable: true })
	refreshToken: string;

	@OneToOne(() => UserConfiguration, (configuration) => configuration.user, {
		cascade: true,
	})
	@JoinColumn()
	configuration: UserConfiguration;

	@Column({ default: false })
	accountDisabled: boolean;
}
