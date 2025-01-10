import { Box, useMediaQuery, useTheme, Toolbar, Container } from "@mui/material";
import { Outlet } from "@tanstack/react-router";
import { useState, useEffect } from "react";

import { useAuthenticationStore } from "stores/authenticationStore";

import { Header } from "./Header";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSideBar/RightSidebar";

const drawerWidthLeft = 240;
const drawerWidthRight = 200;

export const Layout = () => {
	const theme = useTheme();
	const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

	const { isLoggedIn, getUserData } = useAuthenticationStore();

	// Drawer states
	const [leftOpen, setLeftOpen] = useState(lgUp);
	const [rightOpen, setRightOpen] = useState(lgUp);

	// State for submenu expansion
	const [submenuOpen, setSubmenuOpen] = useState(false);

	const handleLeftToggle = () => {
		setLeftOpen((prev) => !prev);
		if (!lgUp) {
			setRightOpen(false);
		}
	};

	const handleRightToggle = () => {
		setRightOpen((prev) => !prev);
		if (!lgUp) {
			setLeftOpen(false);
		}
	};

	useEffect(() => {
		if (!lgUp) {
			setLeftOpen(false);
			setRightOpen(false);
		} else {
			setLeftOpen(true);
			setRightOpen(true);
		}
	}, [lgUp]);

	const handleSubmenuToggle = () => {
		setSubmenuOpen((prev) => !prev);
	};

	const handleHelp = () => {
		console.log("Navigating to Help...");
	};

	const handleAbout = () => {
		console.log("Navigating to About...");
	};

	return (
		<div style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
			{/* Header */}
			<Header
				leftOpen={leftOpen}
				rightOpen={rightOpen}
				lgUp={lgUp}
				onLeftToggle={handleLeftToggle}
				onRightToggle={handleRightToggle}
			/>

			{/* Page Layout */}
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					width: "100%",
					minHeight: "100vh",
					boxSizing: "border-box",
				}}
			>
				{isLoggedIn && (
					<>
						<LeftSidebar
							open={leftOpen}
							lgUp={lgUp}
							drawerWidth={drawerWidthLeft}
							submenuOpen={submenuOpen}
							onSubmenuToggle={handleSubmenuToggle}
							onClose={() => setLeftOpen(false)}
							onHelp={handleHelp}
							onAbout={handleAbout}
						/>
					</>
				)}
				<Box
					component='main'
					sx={{
						flexGrow: 1,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "flex-start",
						order: 0,
						transition: "margin 0.3s",
						px: 2,
					}}
				>
					<Toolbar />
					<Container maxWidth='lg' sx={{ py: 2 }}>
						<Outlet />
					</Container>
				</Box>
				{/* Right Sidebar and FAB */}
				{isLoggedIn && (
					<>
						<RightSidebar
							open={rightOpen}
							drawerWidth={drawerWidthRight}
							onClose={handleRightToggle}
							friendOf={getUserData()?.id ?? ""}
							lgUp={lgUp}
						/>
					</>
				)}
			</Box>
		</div>
	);
};
