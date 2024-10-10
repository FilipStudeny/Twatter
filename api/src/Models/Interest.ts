import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Post } from "./Post";
import { Group } from "./Group";

@Entity()
export class Interest extends BaseEntity {
	@Column()
	name: string;

	@OneToMany(() => Post, (post) => post.interest)
	posts: Post[];

	@OneToMany(() => Group, (group) => group.interest)
	groups: Group[];
}
