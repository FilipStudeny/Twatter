import { Entity, Column, ManyToOne, OneToMany } from "typeorm";

import { BanStrike } from "./Administration/BanStrike";
import { BaseEntity } from "./BaseEntity";
import { Post } from "./Post";
import { Reaction } from "./Reaction";
import { Report } from "./Report";
import { User } from "./User";

@Entity()
export class Comment extends BaseEntity {
	@Column()
	content: string;

	@ManyToOne(() => User, (user) => user.comments)
	creator: User;

	@ManyToOne(() => Post, (post) => post.comments)
	post: Post;

	@OneToMany(() => Reaction, (reaction) => reaction.comment)
	reactions: Reaction[];

	@OneToMany(() => Report, (report) => report.reportedComment)
	reports: Report[];

	@OneToMany(() => BanStrike, (strike) => strike.comment)
	strikes: BanStrike[];
}
