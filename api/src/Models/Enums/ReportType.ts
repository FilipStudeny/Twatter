import { registerEnumType } from "@nestjs/graphql";

enum ReportType {
	SPAM,
	ABUSE,
	INAPPROPRIATE_CONTENT,
	HARASSMENT,
	OTHER,
}

registerEnumType(ReportType, {
	name: "ReportType",
	description: "Different types of reports available",
});

export default ReportType;
