import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { Administrator } from "./Administration/Administrator";
import ReportType from "./Enums/ReportType";
import ReportStatus from "./Enums/ReportStatus";
import { BanStrike } from "./Administration/BanStrike";

@Entity()
export class Report extends BaseEntity {
	@ManyToOne(() => User, (user) => user.reportsFiled)
	reporter: User;

	@ManyToOne(() => Administrator, (admin) => admin.assignedReports, { nullable: true })
	administrator: Administrator;

	@Column({
		type: "enum",
		enum: ReportType,
	})
	reportType: ReportType;

	@Column()
	message: string;

	@Column({
		type: "enum",
		enum: ReportStatus,
		default: ReportStatus.OPEN,
	})
	status: ReportStatus;

	@Column({ nullable: true })
	resolutionMessage: string;

	@ManyToOne(() => Post, (post) => post.reports, { nullable: true })
	reportedPost: Post;

	@ManyToOne(() => Comment, (comment) => comment.reports, { nullable: true })
	reportedComment: Comment;

	@ManyToOne(() => User, (user) => user.reportsAgainst, { nullable: true })
	reportedUser: User;

	@OneToMany(() => BanStrike, (strike) => strike.report)
	strikes: BanStrike[];
}
