// LeftSidebar.tsx

import { RouterLink } from "@Components/navigation/routerLink";
import {
	PersonPinCircleOutlined,
	Home as HomeIcon,
	Search as SearchIcon,
	Dashboard as DashboardIcon,
	Settings as SettingsIcon,
	ExpandLess,
	ExpandMore,
	ArrowRight,
	People as PeopleIcon,
	Logout as LogoutIcon,
	HelpOutline as HelpOutlineIcon,
	Info as InfoIcon,
} from "@mui/icons-material";
import {
	Drawer,
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Collapse,
	Divider,
	Button,
	Tooltip,
	Avatar,
	Typography,
	useTheme,
	Toolbar, // Added Toolbar import
} from "@mui/material";
import { useRouter } from "@tanstack/react-router";
import React from "react";

import { useAuthenticationStore } from "stores/authenticationStore";

interface LeftSidebarProps {
	open: boolean,
	drawerWidth: number,
	lgUp: boolean,
	submenuOpen: boolean,
	onSubmenuToggle: ()=> void,
	onClose: ()=> void,
	onHelp: ()=> void,
	onAbout: ()=> void,
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
	open,
	drawerWidth,
	lgUp,
	submenuOpen,
	onSubmenuToggle,
	onClose,
	onHelp,
	onAbout,
}) => {
	const { getUserData, signOut } = useAuthenticationStore();
	const user = getUserData();

	const router = useRouter();
	const theme = useTheme();

	// Function to check if a route is active
	const isActive = (path: string) => router.basepath === path;

	// Function to handle navigation item click
	const handleNavItemClick = () => {
		if (!lgUp) {
			onClose(); // Close the Drawer on mobile after navigation
		}
	};

	return (
		<Drawer
			variant={lgUp ? "persistent" : "temporary"} // Changed to "persistent"
			open={open}
			onClose={onClose}
			ModalProps={{ keepMounted: true }} // Better open performance on mobile.
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
			{/* Top Section: User Info and Navigation */}
			<Box>
				<Toolbar />
				{useAuthenticationStore.getState().isLoggedIn && (
					<Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
						<Avatar
							alt='User'
							src={user?.profilePictureUrl ? user.profilePictureUrl : undefined}
							sx={{ width: 48, height: 48, mr: 2 }}
						>
							{!user?.profilePictureUrl &&
								(user?.firstName?.charAt(0) ?? "").toUpperCase() +
									(user?.lastName?.charAt(0) ?? "").toUpperCase()}
						</Avatar>
						<Box>
							<Typography variant='subtitle1' noWrap>
								{user?.username}
							</Typography>
							<Typography variant='body2' color='text.secondary' noWrap>
								{user?.firstName + " " + user?.lastName}
							</Typography>
						</Box>
					</Box>
				)}
				{/* Navigation List */}
				<List component='nav'>
					{/* Profile */}
					<ListItem disablePadding>
						<RouterLink
							to='/profile/$id'
							params={{ id: user?.id ?? "" }}
							style={{ textDecoration: "none", width: "100%", color: "inherit" }}
							onClick={handleNavItemClick}
						>
							<ListItemButton selected={isActive("/profile/$id")}>
								<ListItemIcon>
									<PersonPinCircleOutlined />
								</ListItemIcon>
								<ListItemText primary='Profile' />
							</ListItemButton>
						</RouterLink>
					</ListItem>

					<ListItem disablePadding>
						<RouterLink
							to='/users'
							style={{ textDecoration: "none", width: "100%", color: "inherit" }}
							onClick={handleNavItemClick}
						>
							<ListItemButton selected={isActive("/users")}>
								<ListItemIcon>
									<PersonPinCircleOutlined />
								</ListItemIcon>
								<ListItemText primary='Users' />
							</ListItemButton>
						</RouterLink>
					</ListItem>

					{/* Home */}
					<ListItem disablePadding>
						<RouterLink
							to='/home'
							style={{ textDecoration: "none", width: "100%", color: "inherit" }}
							onClick={handleNavItemClick}
						>
							<ListItemButton selected={isActive("/home")}>
								<ListItemIcon>
									<HomeIcon />
								</ListItemIcon>
								<ListItemText primary='Home' />
							</ListItemButton>
						</RouterLink>
					</ListItem>

					{/* Search */}
					<ListItem disablePadding>
						<RouterLink
							to='/search'
							search={{ isBlocked: true, query: "asdasd" }}
							params={{ id: "10" }}
							style={{ textDecoration: "none", width: "100%", color: "inherit" }}
							onClick={handleNavItemClick}
						>
							<ListItemButton selected={isActive("/search")}>
								<ListItemIcon>
									<SearchIcon />
								</ListItemIcon>
								<ListItemText primary='Search' />
							</ListItemButton>
						</RouterLink>
					</ListItem>

					{/* Dashboard */}
					<ListItem disablePadding>
						<RouterLink
							to='/home' // Corrected path
							style={{ textDecoration: "none", width: "100%", color: "inherit" }}
							onClick={handleNavItemClick}
						>
							<ListItemButton selected={isActive("/dashboard")}>
								<ListItemIcon>
									<DashboardIcon />
								</ListItemIcon>
								<ListItemText primary='Dashboard' />
							</ListItemButton>
						</RouterLink>
					</ListItem>

					{/* Settings with Submenu */}
					<ListItem disablePadding>
						<ListItemButton onClick={onSubmenuToggle}>
							<ListItemIcon>
								<SettingsIcon />
							</ListItemIcon>
							<ListItemText primary='Settings' />
							{submenuOpen ? <ExpandLess /> : <ExpandMore />}
						</ListItemButton>
					</ListItem>
					<Collapse in={submenuOpen} timeout='auto' unmountOnExit>
						<List component='div' disablePadding>
							{/* Profile Settings */}
							<ListItem disablePadding>
								<RouterLink
									to='/home'
									style={{ textDecoration: "none", width: "100%", color: "inherit" }}
									onClick={handleNavItemClick}
								>
									<ListItemButton sx={{ pl: 4 }} selected={isActive("/settings/profile")}>
										<ListItemIcon>
											<ArrowRight />
										</ListItemIcon>
										<ListItemText primary='Profile Settings' />
									</ListItemButton>
								</RouterLink>
							</ListItem>
							{/* Account Settings */}
							<ListItem disablePadding>
								<RouterLink
									to='/home'
									style={{ textDecoration: "none", width: "100%", color: "inherit" }}
									onClick={handleNavItemClick}
								>
									<ListItemButton sx={{ pl: 4 }} selected={isActive("/settings/account")}>
										<ListItemIcon>
											<ArrowRight />
										</ListItemIcon>
										<ListItemText primary='Account Settings' />
									</ListItemButton>
								</RouterLink>
							</ListItem>
						</List>
					</Collapse>

					{/* Users */}
					<ListItem disablePadding>
						<RouterLink
							to='/home'
							style={{ textDecoration: "none", width: "100%", color: "inherit" }}
							onClick={handleNavItemClick}
						>
							<ListItemButton selected={isActive("/users")}>
								<ListItemIcon>
									<PeopleIcon />
								</ListItemIcon>
								<ListItemText primary='Users' />
							</ListItemButton>
						</RouterLink>
					</ListItem>
				</List>
			</Box>

			{/* Bottom Section: Action Buttons */}
			<Box>
				<Divider />
				<Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
					{/* Logout Button */}
					<Tooltip title='Logout'>
						<Button
							variant='outlined'
							color='error'
							startIcon={<LogoutIcon />}
							fullWidth
							onClick={() => {
								signOut();
								router.invalidate();
								if (!lgUp) {
									onClose(); // Close Drawer after logout on mobile
								}
							}}
							sx={{
								textTransform: "none",
								justifyContent: "flex-start",
							}}
						>
							Logout
						</Button>
					</Tooltip>

					{/* Help Button */}
					<Tooltip title='Help'>
						<Button
							variant='outlined'
							color='primary'
							startIcon={<HelpOutlineIcon />}
							fullWidth
							onClick={() => {
								onHelp();
								if (!lgUp) {
									onClose(); // Close Drawer after action on mobile
								}
							}}
							sx={{
								textTransform: "none",
								justifyContent: "flex-start",
							}}
						>
							Help
						</Button>
					</Tooltip>

					{/* About Button */}
					<Tooltip title='About'>
						<Button
							variant='outlined'
							color='primary'
							startIcon={<InfoIcon />}
							fullWidth
							onClick={() => {
								onAbout();
								if (!lgUp) {
									onClose(); // Close Drawer after action on mobile
								}
							}}
							sx={{
								textTransform: "none",
								justifyContent: "flex-start",
							}}
						>
							About
						</Button>
					</Tooltip>
				</Box>
			</Box>
		</Drawer>
	);
};
