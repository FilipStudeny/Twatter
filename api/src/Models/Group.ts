import { Entity, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { Interest } from "./Interest";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class Group extends BaseEntity {
	@Column()
	name: string;

	@ManyToOne(() => Interest, (interest) => interest.groups)
	interest: Interest;

	@ManyToOne(() => User, (user) => user.createdGroups)
	owner: User;

	@ManyToMany(() => User, (user) => user.moderatedGroups)
	@JoinTable()
	moderators: User[];

	@ManyToMany(() => User, (user) => user.groups)
	@JoinTable()
	users: User[];

	@OneToMany(() => Post, (post) => post.group)
	posts: Post[];
}
