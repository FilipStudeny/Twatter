import { Entity, Column } from "typeorm";

import { BaseEntity } from "./BaseEntity";

@Entity()
export class Password extends BaseEntity {
	@Column()
	hash: string;

	@Column()
	salt: string;
}
