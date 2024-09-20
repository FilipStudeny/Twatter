import { Entity, Column, OneToOne } from "typeorm";

import DatesEntity from "./DatesEntity";
import User from "./User.entity";

@Entity()
export default class Password extends DatesEntity {
	@Column()
	passwordHash: string;

	@OneToOne(() => User, (user) => user.password)
	user: User;
}
