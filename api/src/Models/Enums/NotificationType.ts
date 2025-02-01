import { registerEnumType } from "@nestjs/graphql";

export enum NotificationType {
	FRIEND_REQUEST,
	REACTION,
	COMMENT,
	ACCEPTED_INTO_GROUP,
	KICKED_OUT_OF_GROUP,
	RECEIVED_BAN_STRIKE,

	REPORT_ASSIGNED,
	REPORT_SUBMITTED,
	REPORT_REJECTED,
	REPORT_CLOSED,
}

registerEnumType(NotificationType, {
	name: "NotificationType",
	description: "Different types of notificaitons available",
});

export default NotificationType;
