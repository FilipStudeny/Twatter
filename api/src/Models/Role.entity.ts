import { Entity, Column } from "typeorm";

import DatesEntity from "./DatesEntity";

@Entity()
export default class Role extends DatesEntity {
	@Column()
	name: string;
}
