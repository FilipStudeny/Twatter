import { Entity, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm";

import { BanStrike } from "./Administration/BanStrike";
import { BaseEntity } from "./BaseEntity";
import { Comment } from "./Comment";
import { Group } from "./Group";
import { Interest } from "./Interest";
import { Reaction } from "./Reaction";
import { Report } from "./Report";
import { User } from "./User";

@Entity()
export class Post extends BaseEntity {
	@Column()
	content: string;

	@Column({ nullable: true })
	postPicture?: string;

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

	@OneToOne(() => Comment, { nullable: true })
	@JoinColumn()
	pinnedComment: Comment;
}
