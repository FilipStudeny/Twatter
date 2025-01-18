import { Entity, Column, OneToMany } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { Group } from "./Group";
import { Post } from "./Post";

@Entity()
export class Interest extends BaseEntity {
	@Column()
	name: string;

	@Column({ nullable: true })
	color: string;

	@OneToMany(() => Post, (post) => post.interest)
	posts: Post[];

	@OneToMany(() => Group, (group) => group.interest)
	groups: Group[];
}
