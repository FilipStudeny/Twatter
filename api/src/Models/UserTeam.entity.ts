import { Entity, ManyToOne } from "typeorm";

import DatesEntity from "./DatesEntity";
import Team from "./Team.entity";
import User from "./User.entity";

@Entity()
export default class UserTeam extends DatesEntity {
	@ManyToOne(() => User, (user) => user.userTeams)
	user: User;

	@ManyToOne(() => Team, (team) => team.userTeams)
	team: Team;
}
