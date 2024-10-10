import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { Post } from "./Post";
import { Comment } from "./Comment";
import ReactionType from "./Enums/ReactionType";

@Entity()
export class Reaction extends BaseEntity {
	@Column({
		type: "enum",
		enum: ReactionType,
	})
	type: ReactionType;

	@ManyToOne(() => User, (user) => user.reactions)
	user: User;

	@ManyToOne(() => Post, (post) => post.reactions, { nullable: true })
	post: Post;

	@ManyToOne(() => Comment, (comment) => comment.reactions, { nullable: true })
	comment: Comment;
}
