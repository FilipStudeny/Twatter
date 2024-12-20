// RightSidebar.tsx

import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
	Drawer,
	Box,
	List,
	ListItem,
	ListItemText,
	Divider,
	Button,
	Tooltip,
	Avatar,
	Typography,
	Toolbar,
	InputBase,
	Badge,
	ListItemAvatar,
} from "@mui/material";
import { alpha } from "@mui/material";
import { styled, keyframes, useTheme } from "@mui/material/styles";
import React, { useState } from "react";

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
			backgroundColor: status === "online" ? theme.palette.success.main : theme.palette.error.main,
			color: status === "online" ? theme.palette.success.main : theme.palette.error.main,
			width: 14,
			height: 14,
			borderRadius: "50%",
			boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
			transform: "translate(25%, 25%)",
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
						border: `1px solid ${theme.palette.success.main}`,
						content: "\"\"",
					}
					: {},
		},
	}),
);

// Search bar styling
const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.action.hover, 0.15),
	"&:hover": { backgroundColor: alpha(theme.palette.action.hover, 0.25) },
	marginBottom: theme.spacing(1.5), // Reduced margin to minimize space
	marginLeft: 0,
	width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	width: "100%",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1.2, 1, 1.2, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
	},
}));

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
	lgUp: boolean,
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ open, drawerWidth, onClose, onlineUsers, lgUp }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const theme = useTheme();

	// Filter users based on search term
	const filteredUsers = onlineUsers.filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()));

	return (
		<Drawer
			variant={lgUp ? "persistent" : "temporary"} // Changed to "persistent"
			open={open}
			onClose={onClose}
			ModalProps={{ keepMounted: true }} // Better open performance on mobile.
			anchor="right"
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
					boxSizing: "border-box",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					backgroundColor: theme.palette.background.paper,
				},
			}}
		>
			<Toolbar>
				<Typography variant='h6' noWrap component='div'>
					Online Users
				</Typography>
				<Tooltip title='Close Friends List'>
					<Button
						variant='outlined'
						color='primary'
						startIcon={<CloseIcon />}
						fullWidth
						onClick={onClose}
						sx={{
							textTransform: "none",
							justifyContent: "flex-start",
						}}
					>
						Close
					</Button>
				</Tooltip>
			</Toolbar>
			<Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
				<Box sx={{ p: 2 }}>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder='Search Users…'
							inputProps={{ "aria-label": "search users" }}
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</Search>
				</Box>
				<Box sx={{ overflow: "auto", p: 2, flexGrow: 1 }}>
					<List disablePadding>
						{filteredUsers.length > 0 ? (
							filteredUsers.map((user, idx) => (
								<Box key={idx}>
									<ListItem
										sx={{
											py: 1,
											"&:hover": { backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08) },
										}}
									>
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
										<ListItemText
											primary={
												<Typography variant='subtitle1' noWrap>
													{user.username}
												</Typography>
											}
											secondary={
												<Typography
													variant='caption'
													color={
														user.onlineStatus === "online" ? "success.main" : "error.main"
													}
												>
													{user.onlineStatus.charAt(0).toUpperCase() +
														user.onlineStatus.slice(1)}
												</Typography>
											}
										/>
									</ListItem>
									{idx < filteredUsers.length - 1 && <Divider component='li' />}
								</Box>
							))
						) : (
							<Typography variant='body2' color='text.secondary' align='center'>
								No users found.
							</Typography>
						)}
					</List>
				</Box>
				<Box sx={{ p: 2 }}>
					<Tooltip title='Close Friends List'>
						<Button
							variant='outlined'
							color='primary'
							startIcon={<CloseIcon />}
							fullWidth
							onClick={onClose}
							sx={{
								textTransform: "none",
								justifyContent: "flex-start",
							}}
						>
							Close
						</Button>
					</Tooltip>
				</Box>
			</Box>
		</Drawer>
	);
};
