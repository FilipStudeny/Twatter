import { Entity, Column, OneToOne, JoinColumn } from "typeorm";

import DatesEntity from "./DatesEntity";
import User from "./User.entity";

@Entity()
export default class Password extends DatesEntity {
	@Column()
	passwordHash: string;

	@Column()
	salt: string;

	@OneToOne(() => User, (user) => user.password)
	@JoinColumn()
	user: User;
}
