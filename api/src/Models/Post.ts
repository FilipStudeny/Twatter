import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { Comment } from "./Comment";
import { Reaction } from "./Reaction";
import { Interest } from "./Interest";
import { Group } from "./Group";
import { Report } from "./Report";
import { BanStrike } from "./Administration/BanStrike";

@Entity()
export class Post extends BaseEntity {
	@Column()
	title: string;

	@Column()
	content: string;

	@ManyToOne(() => User, (user) => user.posts)
	creator: User;

	@ManyToOne(() => Interest, (interest) => interest.posts)
	interest: Interest;

	@OneToMany(() => Comment, (comment) => comment.post)
	comments: Comment[];

	@OneToMany(() => Reaction, (reaction) => reaction.post)
	reactions: Reaction[];

	@ManyToOne(() => Group, (group) => group.posts, { nullable: true })
	group: Group;

	@OneToMany(() => Report, (report) => report.reportedPost)
	reports: Report[];

	@OneToMany(() => BanStrike, (strike) => strike.post)
	strikes: BanStrike[];
}
