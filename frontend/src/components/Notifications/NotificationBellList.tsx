
import {
	Box,
	Typography,
	List,
	CircularProgress,
	Theme,
} from "@mui/material";

import { NotificationItem } from "./Notification";
import {
	NotificationDetail,
} from "../../../../shared";

interface NotificationListProps {
	notifications: NotificationDetail[],
	isPending: boolean,
	theme: Theme,
}

export const NotificationList: React.FC<NotificationListProps> = ({ notifications, isPending, theme }) => {
	if (isPending) {
		return (
			<Box display='flex' justifyContent='center' alignItems='center' py={4}>
				<CircularProgress size={24} />
			</Box>
		);
	}

	if (notifications.length === 0) {
		return (
			<Box p={4} textAlign='center'>
				<Typography variant='body2' color='textSecondary'>
					No new notifications
				</Typography>
			</Box>
		);
	}

	return (
		<List disablePadding>
			{notifications.map((notification, index) => (
				<NotificationItem
					key={notification.id}
					notification={notification}
					theme={theme}
					isLast={index === notifications.length - 1}
				/>
			))}
		</List>
	);
};
