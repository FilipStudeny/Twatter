import { Entity, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";

import DatesEntity from "./DatesEntity";
import Task from "./Task.entity";
import Team from "./Team.entity";
import User from "./User.entity";

@Entity()
export default class UserStory extends DatesEntity {
	@Column()
	description: string;

	@ManyToOne(() => Team, (team) => team.userStories)
	team: Team; // Assigned to one Team

	@ManyToMany(() => User, (user) => user.userStories)
	@JoinTable()
	users: User[]; // Multiple Users involved

	@ManyToOne(() => User, (user) => user.createdUserStories)
	creator: User; // Only one Creator

	@OneToMany(() => Task, (task) => task.userStory)
	tasks: Task[];
}
