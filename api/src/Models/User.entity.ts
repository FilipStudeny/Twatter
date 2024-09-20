import { Entity, Column, OneToOne, OneToMany, ManyToMany, JoinTable, JoinColumn } from "typeorm";

import Comment from "./Comment.entity";
import DatesEntity from "./DatesEntity";
import Password from "./Password.entity";
import Role from "./Role.entity";
import Task from "./Task.entity";
import UserStory from "./UserStory.entity";
import UserTeam from "./UserTeam.entity";

@Entity()
export default class User extends DatesEntity {
	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@OneToOne(() => Password, (password) => password.user, { cascade: true })
	@JoinColumn()
	password: Password;

	@ManyToMany(() => Role)
	@JoinTable()
	roles: Role[]; // Users can have multiple roles

	@OneToMany(() => UserTeam, (userTeam) => userTeam.user)
	userTeams: UserTeam[];

	@ManyToMany(() => UserStory, (userStory) => userStory.users)
	userStories: UserStory[]; // UserStories the user is involved in

	@OneToMany(() => UserStory, (userStory) => userStory.creator)
	createdUserStories: UserStory[]; // UserStories created by the user

	@ManyToMany(() => Task, (task) => task.users)
	tasks: Task[]; // Tasks assigned to the user

	@OneToMany(() => Task, (task) => task.approver)
	approvedTasks: Task[]; // Tasks where the user is the approver

	@OneToMany(() => Comment, (comment) => comment.creator)
	comments: Comment[];
}
