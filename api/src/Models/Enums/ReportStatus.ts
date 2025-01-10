import { registerEnumType } from "@nestjs/graphql";

export enum ReportStatus {
	OPEN,
	IN_PROGRESS,
	RESOLVED,
	CLOSED,
}

registerEnumType(ReportStatus, {
	name: "ReportStatus",
	description: "Different types of report status",
});

export default ReportStatus;
