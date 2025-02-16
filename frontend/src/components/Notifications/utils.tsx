import {
	NotificationsOutlined,
	PersonAdd,
	ThumbUpAlt,
	Comment,
	Group,
	GroupRemove,
	Gavel,
	Assignment,
	AssignmentTurnedIn,
	Block,
	CheckCircle,
} from "@mui/icons-material";
import {
	Theme,
} from "@mui/material";

import {
	NotificationType,
} from "../../../../shared";

export const formatTimeAgo = (dateString: string) => {
	const date = new Date(dateString);
	const now = new Date();
	const diff = now.getTime() - date.getTime();

	const minutes = Math.floor(diff / 60000);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0) return `${days}d ago`;
	if (hours > 0) return `${hours}h ago`;
	if (minutes > 0) return `${minutes}m ago`;

	return "Just now";
};

export const getNotificationColor = (type: NotificationType, theme: Theme) => {
	switch (type) {
		case NotificationType.FriendRequest:
		case NotificationType.Reaction:
		case NotificationType.Comment:
		case NotificationType.AcceptedIntoGroup:
		case NotificationType.ReportClosed:
			return theme.palette.primary.main;
		case NotificationType.KickedOutOfGroup:
		case NotificationType.ReceivedBanStrike:
		case NotificationType.ReportRejected:
			return theme.palette.error.main;
		case NotificationType.ReportAssigned:
		case NotificationType.ReportSubmitted:
			return theme.palette.warning.main;
		default:
			return theme.palette.primary.main;
	}
};

// Notification Icon Component
interface NotificationIconProps {
	type: NotificationType,
	theme: Theme,
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({ type, theme }) => {
	const iconProps = {
		sx: {
			color: getNotificationColor(type, theme),
		},
	};

	switch (type) {
		case NotificationType.FriendRequest:
			return <PersonAdd {...iconProps} />;
		case NotificationType.Reaction:
			return <ThumbUpAlt {...iconProps} />;
		case NotificationType.Comment:
			return <Comment {...iconProps} />;
		case NotificationType.AcceptedIntoGroup:
			return <Group {...iconProps} />;
		case NotificationType.KickedOutOfGroup:
			return <GroupRemove {...iconProps} />;
		case NotificationType.ReceivedBanStrike:
			return <Gavel {...iconProps} />;
		case NotificationType.ReportAssigned:
			return <Assignment {...iconProps} />;
		case NotificationType.ReportSubmitted:
			return <AssignmentTurnedIn {...iconProps} />;
		case NotificationType.ReportRejected:
			return <Block {...iconProps} />;
		case NotificationType.ReportClosed:
			return <CheckCircle {...iconProps} />;
		default:
			return <NotificationsOutlined {...iconProps} />;
	}
};
