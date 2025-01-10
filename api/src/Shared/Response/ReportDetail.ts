import ReportStatus from "@Models/Enums/ReportStatus";
import { Report } from "@Models/Report";
import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { ObjectType, Field } from "@nestjs/graphql";

import UserDetail from "./UserDetail";
import ReportType from "@Models/Enums/ReportType";

@ObjectType()
export class ReportDetail {
	@Field(() => String)
	id: string;

	@Field(() => UserDetail, { nullable: true })
	reporter?: UserDetail;

	@Field(() => String, { nullable: true })
	reportedUser: string | null;

	@Field(() => String, { nullable: true })
	reportedComment: string | null;

	@Field(() => String, { nullable: true })
	reportedPost: string | null;

	@Field(() => String, { nullable: true })
	reportMessage: string;

	@Field(() => String, { nullable: true })
	resolutionMessage: string;

	@Field(() => ReportStatus)
	reportStatus: ReportStatus;

	@Field(() => ReportType)
	reportType: ReportType;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;

	static createMap(mapper: Mapper): void {
		createMap(
			mapper,
			Report,
			ReportDetail,
			forMember(
				(destination) => destination.id,
				mapFrom((source) => source.id),
			),
			forMember(
				(destination) => destination.createdAt,
				mapFrom((source) => source.createdAt),
			),
			forMember(
				(destination) => destination.updatedAt,
				mapFrom((source) => source.updatedAt),
			),
			forMember(
				(destination) => destination.reportMessage,
				mapFrom((source) => source.message),
			),
			forMember(
				(destination) => destination.resolutionMessage,
				mapFrom((source) => source.resolutionMessage),
			),
			forMember(
				(destination) => destination.reportStatus,
				mapFrom((source) => source.status),
			),
			forMember(
				(destination) => destination.reportType,
				mapFrom((source) => source.reportType),
			),
			forMember(
				(destination) => destination.reportedUser,
				mapFrom((source) => source.reportedUser?.id),
			),
			forMember(
				(destination) => destination.reportedComment,
				mapFrom((source) => source.reportedComment?.id),
			),
			forMember(
				(destination) => destination.reportedPost,
				mapFrom((source) => source.reportedPost?.id),
			),
		);
	}
}
