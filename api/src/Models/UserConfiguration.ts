import { Entity, Column, OneToOne } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import ProfileVisibility from "./Enums/ProfileVisibility";
import { User } from "./User";

@Entity()
export class UserConfiguration extends BaseEntity {
	@OneToOne(() => User, (user) => user.configuration)
	user: User;

	@Column({
		type: "enum",
		enum: ProfileVisibility,
		default: ProfileVisibility.PUBLIC,
	})
	profileVisibility: ProfileVisibility;

	@Column()
	profileBackgroundColor1: string = "#6a11cb";

	@Column()
	profileBackgroundColor2: string = "#2575fc";

	//* ** NOTIFICATIONS CONFIG ** */
	@Column({ default: true })
	friendRequest_Email_Notification: boolean;

	@Column({ default: true })
	friendRequest_App_Notification: boolean;

	@Column({ default: true })
	postReactedTo_Email_Notification: boolean;

	@Column({ default: true })
	postReactedTo_App_Notification: boolean;

	@Column({ default: true })
	commentReactedTo_Email_Notification: boolean;

	@Column({ default: true })
	commentReactedTo_App_Notification: boolean;
}
