import { Entity, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Interest } from "./Interest";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Group extends BaseEntity {
	@Column()
	name: string;

	@ManyToOne(() => Interest, (interest) => interest.groups)
	interest: Interest;

	@ManyToMany(() => User, (user) => user.groups)
	@JoinTable()
	users: User[];

	@OneToMany(() => Post, (post) => post.group)
	posts: Post[];
}
