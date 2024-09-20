import { Entity, Column, OneToMany } from "typeorm";

import DatesEntity from "./DatesEntity";
import UserStory from "./UserStory.entity";
import UserTeam from "./UserTeam.entity";

@Entity()
export default class Team extends DatesEntity {
	@Column()
	name: string;

	@Column()
	description: string;

	@OneToMany(() => UserTeam, (userTeam) => userTeam.team)
	userTeams: UserTeam[];

	@OneToMany(() => UserStory, (userStory) => userStory.team)
	userStories: UserStory[];
}
