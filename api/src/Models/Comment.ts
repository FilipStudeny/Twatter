import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { Post } from "./Post";
import { Reaction } from "./Reaction";
import { Report } from "./Report";
import { BanStrike } from "./Administration/BanStrike";

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
