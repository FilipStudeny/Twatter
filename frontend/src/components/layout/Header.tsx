// Header.tsx

import { RouterLink } from "@Components/navigation/routerLink";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Toolbar, IconButton, Avatar, Button, Typography, Box } from "@mui/material";

import { useAuth } from "hooks/auth";
import { useAuthenticationStore } from "stores/authentication";

interface HeaderProps {
	leftOpen: boolean,
	lgUp: boolean,
	onLeftToggle: ()=> void,
}

export const Header: React.FC<HeaderProps> = ({ leftOpen, lgUp, onLeftToggle }) => {
	const { isLogged } = useAuth();
    const isLoggedInAuth = useAuthenticationStore((state) => state.isLoggedIn);

	// Remove useMemo as it's unnecessary for a boolean
	const isLoggedIn = isLogged();

	return (
		<AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
			<Toolbar sx={{ justifyContent: "flex-start" }}>
				{/* Toggle Drawer Button */}
				<IconButton
					color='inherit'
					aria-label={leftOpen ? "Close drawer" : "Open drawer"}
					edge='start'
					onClick={onLeftToggle}
					sx={{ mr: 2 }}
				>
					{leftOpen && lgUp ? <CloseIcon /> : <MenuIcon />}
				</IconButton>

				{/* Conditional Rendering Based on Authentication Status */}
				{isLoggedIn ? (
					<Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
						<Avatar alt='User Profile' src='/static/images/avatar/1.jpg' sx={{ mr: 1 }}>
							U
						</Avatar>
						<Button color='inherit'>John Doe</Button>
					</Box>
				) : (
					<Typography variant='h6' noWrap sx={{ ml: 2, mr: 2 }}>
						My Responsive Layout
					</Typography>
				)}

				{isLoggedInAuth && (
					<Typography variant='h6' noWrap sx={{ ml: 2, mr: 2 }}>
						LOGGED IN
					</Typography>
				)}

				{/* Spacer to push the following buttons to the right side */}
				<Box sx={{ flexGrow: 1 }} />

				{/* Right side: Login and Profile buttons */}
				{!isLoggedIn && (
					<RouterLink to='/sign_in' style={{ textDecoration: "none", color: "inherit", marginRight: "8px" }}>
						<Button color='inherit' startIcon={<HomeIcon />}>
							Login
						</Button>
					</RouterLink>
				)}
				{isLoggedIn && <Button color='inherit'>Profile</Button>}
			</Toolbar>
		</AppBar>
	);
};
