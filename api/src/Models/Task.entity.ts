import { Entity, Column, ManyToOne, ManyToMany, OneToMany, JoinTable } from "typeorm";

import Comment from "./Comment.entity";
import DatesEntity from "./DatesEntity";
import TaskStatus from "./Enums/TaskStatus.enum";
import User from "./User.entity";
import UserStory from "./UserStory.entity";

@Entity()
export default class Task extends DatesEntity {
	@Column()
	description: string;

	@Column({
		type: "enum",
		enum: TaskStatus,
		default: TaskStatus.IN_PROGRESS,
	})
	status: TaskStatus;

	@ManyToMany(() => User, (user) => user.tasks)
	@JoinTable()
	users: User[]; // Assigned users

	@ManyToOne(() => User, (user) => user.approvedTasks)
	approver: User; // Single approver

	@ManyToOne(() => UserStory, (userStory) => userStory.tasks)
	userStory: UserStory; // Assigned to one UserStory

	@OneToMany(() => Comment, (comment) => comment.task)
	comments: Comment[];
}
