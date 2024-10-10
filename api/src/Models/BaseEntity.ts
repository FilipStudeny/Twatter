import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
