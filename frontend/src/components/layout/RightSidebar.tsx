import CloseIcon from "@mui/icons-material/Close";
import {
	Drawer,
	IconButton,
	Toolbar,
	Box,
	Typography,
	Avatar,
	Button,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Divider,
	Badge,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import React from "react"; // Ensure React is imported

// Define the pulsing animation
const pulse = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  70% {
    transform: scale(1.4);
    opacity: 0;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
`;

// Create a StyledBadge component with customized styles and animation
const StyledBadge = styled(Badge, { shouldForwardProp: (prop) => prop !== "status" })<{ status: "online" | "offline" }>(
	({ theme, status }) => ({
		"& .MuiBadge-badge": {
			backgroundColor:
				status === "online"
					? "#44b700" // Green color for online status
					: "#f44336", // Red color for offline status
			color: status === "online" ? "#44b700" : "#f44336",
			width: 16, // Increased size
			height: 16, // Increased size
			borderRadius: "50%",
			boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
			"&::after":
				status === "online"
					? {
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							borderRadius: "50%",
							animation: `${pulse} 1.2s infinite ease-in-out`,
							border: "1px solid currentColor",
							content: "\"\"",
						}
					: {},
		},
	}),
);

// Updated User interface with onlineStatus
export interface User {
	username: string,
	avatar: string,
	onlineStatus: "online" | "offline",
}

interface RightSidebarProps {
	open: boolean,
	drawerWidth: number,
	onClose: ()=> void,
	onlineUsers: User[],
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ open, drawerWidth, onClose, onlineUsers }) => {
	return (
		<Drawer
			variant='persistent'
			anchor='right'
			open={open}
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
					boxSizing: "border-box",
				},
				order: 2,
			}}
		>
			<Toolbar>
				<IconButton edge='end' color='inherit' onClick={onClose} aria-label='Close sidebar'>
					<CloseIcon />
				</IconButton>
			</Toolbar>
			<Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
				<Box sx={{ overflow: "auto", p: 2, flexGrow: 1 }}>
					<Typography variant='h6' sx={{ mb: 2 }}>
						Online Users
					</Typography>
					<List disablePadding>
						{onlineUsers.map((user, idx) => (
							<Box key={idx}>
								<ListItem sx={{ py: 0.5 }}>
									<ListItemAvatar>
										<StyledBadge
											status={user.onlineStatus}
											overlap='circular'
											anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
											variant='dot'
											aria-label={user.onlineStatus === "online" ? "Online" : "Offline"}
										>
											<Avatar src={user.avatar} alt={user.username} />
										</StyledBadge>
									</ListItemAvatar>
									<ListItemText primary={user.username} />
								</ListItem>
								{idx < onlineUsers.length - 1 && <Divider component='li' />}
							</Box>
						))}
					</List>
				</Box>
				<Box sx={{ p: 2 }}>
					<Button variant='contained' onClick={onClose} fullWidth>
						Close Sidebar
					</Button>
				</Box>
			</Box>
		</Drawer>
	);
};
