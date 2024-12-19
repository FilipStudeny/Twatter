import { Box, useMediaQuery, useTheme, Fab, Toolbar } from "@mui/material";
import { Outlet } from "@tanstack/react-router";
import { useState, useEffect } from "react";

import { Header } from "./Header";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar, User } from "./RightSidebar";

const drawerWidthLeft = 240;
const drawerWidthRight = 200;

const onlineUsers: User[] = [
	{ username: "Alice", avatar: "https://i.pravatar.cc/40?u=alice", onlineStatus: "online" },
	{ username: "Bob", avatar: "https://i.pravatar.cc/40?u=bob", onlineStatus: "online" },
	{ username: "Charlie", avatar: "https://i.pravatar.cc/40?u=charlie", onlineStatus: "offline" },
	{ username: "Diana", avatar: "https://i.pravatar.cc/40?u=diana", onlineStatus: "offline" },
];

export const Layout = () => {
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
			{/* Header */}
			<Header leftOpen={leftOpen} lgUp={lgUp} onLeftToggle={handleLeftToggle} />

			{/* Page Layout */}
			<Box
				sx={{ display: "flex", flexDirection: "row", width: "100%", height: "100vh", boxSizing: "border-box" }}
			>
				<Box
					component='main'
					sx={{
						flexGrow: 1,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "flex-start",
						p: 3,
						order: 1,
						transition: "margin 0.3s",
					}}
				>
					<Toolbar />
					<Outlet />
				</Box>

				{/* Left Sidebar */}
				<LeftSidebar
					open={leftOpen}
					lgUp={lgUp}
					drawerWidth={drawerWidthLeft}
					submenuOpen={submenuOpen}
					onSubmenuToggle={handleSubmenuToggle}
					onClose={() => setLeftOpen(false)}
					onLogout={handleLogout}
					onHelp={handleHelp}
					onAbout={handleAbout}
				/>

				{/* Right Sidebar (Online Users) - Large screens only */}
				{lgUp && (
					<RightSidebar
						open={rightOpen}
						drawerWidth={drawerWidthRight}
						onClose={handleRightToggle}
						onlineUsers={onlineUsers}
					/>
				)}

				{/* Floating Action Button for Right Sidebar (only on large screens) */}
				{lgUp && (
					<Fab
						color='primary'
						aria-label='toggle right sidebar'
						onClick={handleRightToggle}
						sx={{ position: "fixed", bottom: 16, right: 16 }}
					>
						+
					</Fab>
				)}
			</Box>
		</>
	);
};

