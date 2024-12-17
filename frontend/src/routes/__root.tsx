import AddIcon from "@mui/icons-material/Add";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
    Fab,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Avatar,
    Card,
    CardHeader,
    CardContent,
    Divider,
    Tooltip,
} from "@mui/material";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { useState, useEffect } from "react";

import { AppRoutes } from "../utils/routesConfig";

const drawerWidthLeft = 240;
const drawerWidthRight = 240;

const onlineUsers = [
    { username: "Alice", avatar: "https://i.pravatar.cc/40?u=alice" },
    { username: "Bob", avatar: "https://i.pravatar.cc/40?u=bob" },
    { username: "Charlie", avatar: "https://i.pravatar.cc/40?u=charlie" },
    { username: "Diana", avatar: "https://i.pravatar.cc/40?u=diana" },
];

const Layout = () => {
    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

    // Drawer states
    const [leftOpen, setLeftOpen] = useState(lgUp);
    const [rightOpen, setRightOpen] = useState(lgUp);

    // State for submenu expansion
    const [submenuOpen, setSubmenuOpen] = useState(false);

    const handleLeftToggle = () => {
        setLeftOpen((prev) => !prev);
        if (!lgUp) {
            // On small screens, closing the right sidebar when left is opened as overlay
            setRightOpen(false);
        }
    };

    const handleRightToggle = () => {
        setRightOpen((prev) => !prev);
    };

    // Automatically close the left sidebar when resizing below lg
    useEffect(() => {
        if (!lgUp) {
            setLeftOpen(false);
        }
    }, [lgUp]);

    const handleSubmenuToggle = () => {
        setSubmenuOpen((prev) => !prev);
    };

    const handleLogout = () => {
        console.log("Logging out...");
        // Implement actual logout logic here
    };

    const handleHelp = () => {
        console.log("Navigating to Help...");
        // Implement navigation to help page here
    };

    const handleAbout = () => {
        console.log("Navigating to About...");
        // Implement navigation to about page here
    };

    return (
        <>
            {/* Top AppBar */}
            <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar sx={{ justifyContent: "flex-start" }}>
                    {/* Left side: Menu/Close icon, Title, User Avatar, and Username */}
                    <IconButton color='inherit' aria-label='toggle left drawer' edge='start' onClick={handleLeftToggle}>
                        {leftOpen && lgUp ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>

                    <Avatar alt='User Profile' sx={{ mr: 1 }}>
                        U
                    </Avatar>
                    <Button color='inherit'>John Doe</Button>
                    <Typography variant='h6' noWrap sx={{ ml: 2, mr: 2 }}>
                        My Responsive Layout
                    </Typography>

                    {/* Spacer to push the following buttons to the right side */}
                    <Box sx={{ flexGrow: 1 }} />

                    {/* Right side: Login and Profile buttons */}
                    <Button color='inherit'>Login</Button>
                    <Button color='inherit'>Profile</Button>
                </Toolbar>
            </AppBar>

            {/* Page Layout */}
            <Box
                sx={{ display: "flex", flexDirection: "row", width: "100%", height: "100vh", boxSizing: "border-box" }}
            >
                <Outlet />
                {/* Left Sidebar (Menu) */}
                <Drawer
                    variant={lgUp ? "persistent" : "temporary"}
                    open={leftOpen}
                    onClose={() => setLeftOpen(false)}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        width: drawerWidthLeft,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidthLeft,
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
                                <IconButton edge='start' color='inherit' onClick={handleLeftToggle}>
                                    <CloseIcon />
                                </IconButton>
                            )}
                        </Toolbar>
                        <Box sx={{ overflow: "auto" }}>
                            <List component='nav'>
                                <ListItem disablePadding component={Link} to={AppRoutes.HOME._}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <HomeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary='Home' />
                                    </ListItemButton>
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
                                    <ListItemButton onClick={handleSubmenuToggle}>
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
                                    onClick={handleLogout}
                                />
                            </Tooltip>
                            <Tooltip title='Help'>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                    sx={{ borderRadius: 0 }}
                                    startIcon={<HelpOutlineIcon />}
                                    onClick={handleHelp}
                                />
                            </Tooltip>
                            <Tooltip title='About'>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                    sx={{ borderRadius: 0 }}
                                    startIcon={<InfoIcon />}
                                    onClick={handleAbout}
                                />
                            </Tooltip>
                        </Box>
                    </Box>
                </Drawer>

                {/* Right Sidebar (Online Users) - Large screens only */}
                {lgUp && (
                    <Drawer
                        variant='persistent'
                        anchor='right'
                        open={rightOpen}
                        sx={{
                            width: drawerWidthRight,
                            flexShrink: 0,
                            "& .MuiDrawer-paper": {
                                width: drawerWidthRight,
                                boxSizing: "border-box",
                            },
                            order: 2,
                        }}
                    >
                        <Toolbar>
                            <IconButton edge='end' color='inherit' onClick={handleRightToggle}>
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                            <Box sx={{ overflow: "auto", p: 2, flexGrow: 1 }}>
                                <Typography variant='h6' sx={{ mb: 2 }}>
                                    Online Users
                                </Typography>
                                {onlineUsers.map((user, idx) => (
                                    <Card key={idx} sx={{ mb: 2 }}>
                                        <CardHeader
                                            avatar={<Avatar src={user.avatar} alt={user.username} />}
                                            title={user.username}
                                        />
                                        <CardContent>
                                            <Typography variant='body2' color='text.secondary'>
                                                Currently active
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                            <Box sx={{ p: 2 }}>
                                <Button variant='contained' onClick={handleRightToggle} fullWidth>
                                    Close Sidebar
                                </Button>
                            </Box>
                        </Box>
                    </Drawer>
                )}

                {/* Floating Action Button for Right Sidebar (only on large screens) */}
                {lgUp && (
                    <Fab
                        color='primary'
                        aria-label='toggle right sidebar'
                        onClick={handleRightToggle}
                        sx={{ position: "fixed", bottom: 16, right: 16 }}
                    >
                        <AddIcon />
                    </Fab>
                )}
            </Box>
        </>
    );
};

export const Route = createRootRoute({ component: Layout });
