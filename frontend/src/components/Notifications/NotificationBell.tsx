import { NotificationsActiveOutlined } from "@mui/icons-material";
import {
	Badge,
	IconButton,
	Paper,
	Box,
	Typography,
	Button,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	CircularProgress,
} from "@mui/material";
import { useState, useEffect, useRef, useMemo } from "react";

import { useGetNotificationsQuery, useGetUnreadNotificationsCountQuery } from "../../../../shared";

const NotificationBell = () => {
	const { data: notificationsCount } = useGetUnreadNotificationsCountQuery(undefined, {
		refetchInterval: 30000,
	});

	const [open, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const {
		data: notificationsData,
		refetch,
		isPending,
	} = useGetNotificationsQuery(undefined, {
		enabled: false,
	});

	const notifications = useMemo(() => {
		return notificationsData?.GetNotifications.items || [];
	}, [notificationsData]);

	const handleClick = () => {
		setOpen((prev) => !prev);
		if (!open) {
			refetch();
		}
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
			setOpen(false);
		}
	};

	useEffect(() => {
		if (open) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [open]);

	return (
		<Box position='relative' ref={menuRef}>
			<IconButton color='inherit' aria-label='notifications' edge='start' sx={{ mr: 2 }} onClick={handleClick}>
				<Badge badgeContent={notificationsCount?.GetUnreadNotificationsCount} color='error'>
					<NotificationsActiveOutlined />
				</Badge>
			</IconButton>
			{open && (
				<Paper
					elevation={3}
					sx={{
						position: "absolute",
						top: "100%",
						right: 0,
						width: 250,
						mt: 1,
						p: 2,
						zIndex: 10,
					}}
				>
					<Typography variant='subtitle1'>Notifications</Typography>
					{isPending ? (
						<Box display='flex' justifyContent='center' alignItems='center' height={100}>
							<CircularProgress size={24} />
						</Box>
					) : (
						<List>
							{notifications.length > 0 ? (
								notifications.map((notification) => (
									<ListItem key={notification.id}>
										<ListItemAvatar>
											<Avatar src={notification.creator.profilePictureUrl || undefined}>
												{!notification.creator.profilePictureUrl &&
													(notification.creator.firstName?.charAt(0) ?? "").toUpperCase() +
														(notification.creator.lastName?.charAt(0) ?? "").toUpperCase()}
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={notification.message}
											secondary={notification.createdAt}
										/>
									</ListItem>
								))
							) : (
								<Typography variant='body2' color='textSecondary'>
									No new notifications
								</Typography>
							)}
						</List>
					)}
					<Button fullWidth sx={{ mt: 2 }} variant='contained' color='primary'>
						View all notifications
					</Button>
				</Paper>
			)}
		</Box>
	);
};

export default NotificationBell;
