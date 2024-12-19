import { RouterLink } from "@Components/navigation/routerLink";
import { PersonPinCircleOutlined } from "@mui/icons-material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import {
	Drawer,
	IconButton,
	Toolbar,
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
} from "@mui/material";

import { useAuth } from "hooks/auth";
import { useAuthenticationStore } from "stores/authentication";

interface LeftSidebarProps {
	open: boolean,
	drawerWidth: number,
	lgUp: boolean,
	submenuOpen: boolean,
	onSubmenuToggle: ()=> void,
	onClose: ()=> void,
	onLogout: ()=> void,
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

    const { signOut } = useAuth();

	const signOutAuth = useAuthenticationStore((state) => state.signOut);

	return (
		<Drawer
			variant={lgUp ? "persistent" : "temporary"}
			open={open}
			onClose={onClose}
			ModalProps={{ keepMounted: true }}
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
					boxSizing: "border-box",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				},
				order: 0,
			}}
		>
			{/* Main navigation area */}
			<Box>
				<Toolbar>
					{lgUp && (
						<IconButton edge='start' color='inherit' onClick={onClose}>
							<CloseIcon />
						</IconButton>
					)}
				</Toolbar>
				<Box sx={{ overflow: "auto" }}>
					<List component='nav'>
						<ListItem disablePadding>
							<RouterLink
								to='/profile/$id'
								params={{ id: "10" }}
								style={{ textDecoration: "none", width: "100%", color: "inherit" }}
							>
								<ListItemButton>
									<ListItemIcon>
										<PersonPinCircleOutlined />
									</ListItemIcon>
									<ListItemText primary='Profile' />
								</ListItemButton>
							</RouterLink>
						</ListItem>
						<ListItem disablePadding>
							<RouterLink to='/home' style={{ textDecoration: "none", width: "100%", color: "inherit" }}>
								<ListItemButton>
									<ListItemIcon>
										<HomeIcon />
									</ListItemIcon>
									<ListItemText primary='Home' />
								</ListItemButton>
							</RouterLink>
						</ListItem>
						<ListItem disablePadding>
							<RouterLink
								to='/search'
								search={{ isBlocked: true, query: "asdasd" }}
								params={{ id: "10" }}
								style={{ textDecoration: "none", width: "100%", color: "inherit" }}
							>
								<ListItemButton>
									<ListItemIcon>
										<HomeIcon />
									</ListItemIcon>
									<ListItemText primary='Search' />
								</ListItemButton>
							</RouterLink>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<DashboardIcon />
								</ListItemIcon>
								<ListItemText primary='Dashboard' />
							</ListItemButton>
						</ListItem>
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
								<ListItemButton sx={{ pl: 4 }}>
									<ListItemIcon>
										<ArrowRightIcon />
									</ListItemIcon>
									<ListItemText primary='Profile Settings' />
								</ListItemButton>
								<ListItemButton sx={{ pl: 4 }}>
									<ListItemIcon>
										<ArrowRightIcon />
									</ListItemIcon>
									<ListItemText primary='Account Settings' />
								</ListItemButton>
							</List>
						</Collapse>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<PeopleIcon />
								</ListItemIcon>
								<ListItemText primary='Users' />
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
			</Box>

			{/* Bottom action buttons */}
			<Box>
				<Divider />
				<Box sx={{ display: "flex" }}>
					<Tooltip title='Logout'>
						<Button
							variant='contained'
							color='primary'
							fullWidth
							sx={{ borderRadius: 0 }}
							startIcon={<LogoutIcon />}
							onClick={() => { signOut(); signOutAuth(); } }
						/>
					</Tooltip>
					<Tooltip title='Help'>
						<Button
							variant='contained'
							color='primary'
							fullWidth
							sx={{ borderRadius: 0 }}
							startIcon={<HelpOutlineIcon />}
							onClick={onHelp}
						/>
					</Tooltip>
					<Tooltip title='About'>
						<Button
							variant='contained'
							color='primary'
							fullWidth
							sx={{ borderRadius: 0 }}
							startIcon={<InfoIcon />}
							onClick={onAbout}
						/>
					</Tooltip>
				</Box>
			</Box>
		</Drawer>
	);
};
