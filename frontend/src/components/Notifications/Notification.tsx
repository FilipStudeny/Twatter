
import { RouterLink } from "@Components/navigation/routerLink";
import {
	Box,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Divider,
	ListItemButton,
	alpha,
	Theme,
} from "@mui/material";

import { formatTimeAgo, getNotificationColor, NotificationIcon } from "./utils";
import {
	NotificationDetail,
} from "../../../../shared";

interface NotificationItemProps {
	notification: NotificationDetail,
	theme: Theme,
	isLast: boolean,
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification, theme, isLast }) => {
	return (
		<RouterLink to={"/users/$id"} params={{ id: notification.creator.id }} style={{}}>
			<Box>
				<ListItemButton
					sx={{
						py: 2,
						px: 3,
						backgroundColor: notification.isRead ? "transparent" : alpha(theme.palette.primary.main, 0.04),
						"&:hover": {
							backgroundColor: alpha(theme.palette.primary.main, 0.08),
						},
					}}
				>
					<ListItemAvatar>
						<Avatar
							src={notification.creator.profilePictureUrl || undefined}
							sx={{
								backgroundColor: notification.creator.profilePictureUrl
									? "transparent"
									: getNotificationColor(notification.notificationType, theme),
								color: getNotificationColor(notification.notificationType, theme),
							}}
						>
							{!notification.creator.profilePictureUrl &&
								`${notification.creator.firstName?.charAt(0) ?? ""}${
									notification.creator.lastName?.charAt(0) ?? ""
								}`}
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={notification.message} secondary={formatTimeAgo(notification.createdAt)} />
					<NotificationIcon type={notification.notificationType} theme={theme} />
				</ListItemButton>
				{!isLast && <Divider />}
			</Box>
		</RouterLink>
	);
};
