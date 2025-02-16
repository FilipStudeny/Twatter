import {
	NotificationsOutlined,
	Close as CloseIcon,
} from "@mui/icons-material";
import {
	Badge,
	IconButton,
	Paper,
	Box,
	Typography,
	Button,
	Fade,
	Tooltip,
	useTheme,
	alpha,
} from "@mui/material";
import { useState, useEffect, useRef, useMemo } from "react";

import { NotificationList } from "./NotificationBellList";
import {
	useGetNotificationsQuery,
	useGetUnreadNotificationsCountQuery,
} from "../../../../shared";

const NotificationBell = () => {
	const [open, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const theme = useTheme();

	const { data: notificationsCount } = useGetUnreadNotificationsCountQuery(undefined, {
		refetchInterval: 30000,
	});

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
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [open]);

	return (
		<Box position='relative' ref={menuRef}>
			<Tooltip title='Notifications'>
				<IconButton
					color='inherit'
					edge='start'
					onClick={handleClick}
					sx={{
						transition: theme.transitions.create(["background-color"]),
						"&:hover": {
							backgroundColor: alpha(theme.palette.primary.main, 0.08),
						},
						mr: 2,
					}}
				>
					<Badge
						badgeContent={notificationsCount?.GetUnreadNotificationsCount}
						color='error'
						sx={{
							"& .MuiBadge-badge": {
								right: -3,
								top: 3,
								border: `2px solid ${theme.palette.background.paper}`,
								padding: "0 4px",
							},
						}}
					>
						<NotificationsOutlined />
					</Badge>
				</IconButton>
			</Tooltip>

			<Fade in={open}>
				<Paper
					elevation={8}
					sx={{
						position: "absolute",
						top: "100%",
						right: 0,
						width: 360,
						maxWidth: "90vw",
						mt: 1,
						borderRadius: 2,
						overflow: "hidden",
						zIndex: theme.zIndex.modal,
					}}
				>
					{/* Header */}
					<Box
						sx={{
							p: 2,
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							borderBottom: `1px solid ${theme.palette.divider}`,
							backgroundColor: theme.palette.background.default,
						}}
					>
						<Typography variant='h6' sx={{ fontWeight: 600 }}>
							Notifications
						</Typography>
						<IconButton size='small' onClick={() => setOpen(false)}>
							<CloseIcon fontSize='small' />
						</IconButton>
					</Box>

					{/* Content */}
					<Box sx={{ maxHeight: 400, overflow: "auto" }}>
						<NotificationList notifications={notifications} isPending={isPending} theme={theme} />
					</Box>

					{/* Footer */}
					<Box
						sx={{
							p: 2,
							borderTop: `1px solid ${theme.palette.divider}`,
							backgroundColor: theme.palette.background.default,
						}}
					>
						<Button
							fullWidth
							variant='contained'
							color='primary'
							size='medium'
							sx={{
								borderRadius: 1,
								textTransform: "none",
								fontWeight: 500,
							}}
						>
							View all notifications
						</Button>
					</Box>
				</Paper>
			</Fade>
		</Box>
	);
};

export default NotificationBell;
