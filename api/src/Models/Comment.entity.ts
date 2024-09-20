import { Entity, Column, ManyToOne } from "typeorm";

import DatesEntity from "./DatesEntity";
import Task from "./Task.entity";
import User from "./User.entity";

@Entity()
export default class Comment extends DatesEntity {
	@Column()
	content: string;

	@ManyToOne(() => User, (user) => user.comments)
	creator: User;

	@ManyToOne(() => Task, (task) => task.comments)
	task: Task;
}
