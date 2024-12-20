// Header.tsx

import { RouterLink } from "@Components/navigation/routerLink";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People"; // Icon for Friends
import {
	AppBar,
	Toolbar,
	IconButton,
	Avatar,
	Button,
	Typography,
	Box,
	Tooltip,
	Menu,
	MenuItem,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React from "react";

import { useAuthenticationStore } from "stores/authenticationStore";

interface HeaderProps {
	leftOpen: boolean,
	rightOpen: boolean,
	lgUp: boolean,
	onLeftToggle: ()=> void,
	onRightToggle: ()=> void, // New prop for toggling RightSidebar
}

export const Header: React.FC<HeaderProps> = ({ leftOpen, rightOpen, lgUp, onLeftToggle, onRightToggle }) => {
	const isLoggedIn = useAuthenticationStore((state) => state.isLoggedIn);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	// State for user menu
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar
			position='fixed'
			sx={{
				zIndex: (theme) => theme.zIndex.drawer + 1,
				backgroundColor: theme.palette.primary.main,
			}}
		>
			<Toolbar sx={{ justifyContent: "space-between" }}>
				{/* Left side: Logo and Drawer Toggle */}
				<Box sx={{ display: "flex", alignItems: "center" }}>
					{isLoggedIn && (
						<Tooltip title={leftOpen ? "Close drawer" : "Open drawer"}>
							<IconButton
								color='inherit'
								aria-label={leftOpen ? "Close drawer" : "Open drawer"}
								edge='start'
								onClick={onLeftToggle}
								sx={{ mr: 2 }}
							>
								{leftOpen && lgUp ? <CloseIcon /> : <MenuIcon />}
							</IconButton>
						</Tooltip>
					)}
					{/* Logo */}
					<RouterLink to='/home' style={{ color: "white" }}>
						<Box sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
							<Typography
								variant='h6'
								noWrap
								component='div'
								sx={{ display: { xs: "none", sm: "block" }, fontWeight: "bold" }}
							>
								Twatter
							</Typography>
						</Box>
					</RouterLink>
				</Box>

				{/* Spacer */}
				<Box sx={{ flexGrow: 1 }} />

				{/* Right side: Navigation Buttons */}
				<Box sx={{ display: "flex", alignItems: "center" }}>
					{isLoggedIn && (
						<>
							<Tooltip title={rightOpen ? "Close friends list" : "Open friends list"}>
								<IconButton
									color='inherit'
									aria-label={rightOpen ? "Close drawer" : "Open drawer"}
									edge='start'
									onClick={onRightToggle}
									sx={{ mr: 2 }}
								>
									<PeopleIcon />
								</IconButton>
							</Tooltip>

							{/* Profile Menu */}
							<Tooltip title='Profile'>
								<IconButton onClick={handleMenuOpen} sx={{ p: 0, ml: 1 }}>
									<Avatar alt={"User"} src={"https://randomuser.me/api/portraits/thumb/men/75.jpg"} />
								</IconButton>
							</Tooltip>
							<Menu
								anchorEl={anchorEl}
								open={open}
								onClose={handleMenuClose}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
							>
								<MenuItem onClick={handleMenuClose} component={RouterLink} to='/profile'>
									Profile
								</MenuItem>
								<MenuItem onClick={handleMenuClose} component={RouterLink} to='/settings'>
									Settings
								</MenuItem>
								<MenuItem
									onClick={() => {
										useAuthenticationStore.getState().signOut();
										handleMenuClose();
									}}
								>
									Logout
								</MenuItem>
							</Menu>
						</>
					)}

					{/* Login Button for Guests */}
					{!isLoggedIn && (
						<RouterLink
							to='/sign-in'
							style={{ textDecoration: "none", color: "inherit", marginRight: isMobile ? 0 : "8px" }}
						>
							<Button
								color='inherit'
								startIcon={<HomeIcon />}
								sx={{
									display: { xs: "none", sm: "inline-flex" },
									textTransform: "none",
									fontSize: "16px",
								}}
							>
								Login
							</Button>
						</RouterLink>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
};
