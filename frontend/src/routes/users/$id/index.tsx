// RouteComponent.tsx

import { RouterLink } from "@Components/navigation/routerLink";
import FriendsList from "@Components/profile/FriendsList";
import UserComments from "@Components/profile/UserComments";
import UserPosts from "@Components/profile/UserPosts";
import UserReactions from "@Components/profile/UserReactions";
import { ReportButton } from "@Components/report/ReportButton";
import { GET_ERROR_LIST } from "@Utils/getResponseError";
import {
	PersonAdd as PersonAddIcon,
	Message as MessageIcon,
} from "@mui/icons-material";
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Avatar,
	Typography,
	IconButton,
	Grid,
	Divider,
	Tabs,
	Tab,
	CircularProgress,
	Tooltip,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { useGetUserQuery } from "../../../../../shared";

export const Route = createFileRoute("/users/$id/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();

	const [tabValue, setTabValue] = useState<number>(0);

	const {
		data: userData,
		isLoading: userLoading,
		isError: userError,
		error: userErrorMessage,
	} = useGetUserQuery({ userId: id });

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	const handleAddFriend = () => {
		console.log("Add Friend clicked");
		// Implement add friend functionality here
	};

	const handleSendMessage = () => {
		console.log("Send Message clicked");
		// Implement send message functionality here
	};

	if (userLoading) {
		return (
			<Box
				sx={{
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "background.default",
				}}
			>
				<CircularProgress
					sx={{
						color: "primary.main",
						mb: 2,
						animationDuration: "1.5s",
					}}
					thickness={4.5}
					size={60}
				/>
				<Typography
					variant="h6"
					color="text.secondary"
					sx={{
						fontWeight: "medium",
						textAlign: "center",
					}}
				>
					Loading user data, please wait...
				</Typography>
			</Box>
		);
	}

	if (userError || !userData?.getUsers?.items?.length) {
		return (
			<Box
				p={4}
				sx={{
					borderRadius: 3,
					textAlign: "center",
					boxShadow: 3,
					backgroundColor: "background.default",
					color: "text.primary",
				}}
			>
				<Typography variant="h4" fontWeight="bold" color="error" gutterBottom>
					{userError ? "Something Went Wrong" : "User Not Found"}
				</Typography>
				<Typography variant="body1" color="text.secondary" gutterBottom>
					{userError
						? "We ran into an issue while fetching the user data. Please refresh the page or try again later."
						: "The user you're looking for doesn't exist or may have been removed."}
				</Typography>
				<Box
					sx={{
						mt: 3,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					{GET_ERROR_LIST(userErrorMessage).length > 0 && (
						<Box sx={{ textAlign: "left", maxWidth: "400px", mb: 2 }}>
							<Typography variant="subtitle1" fontWeight="bold" color="error">
								Error Details:
							</Typography>
							{GET_ERROR_LIST(userErrorMessage).map(
								(errMsg: string, index: number) => (
									<Typography
										key={index}
										variant="body2"
										color="text.secondary"
										sx={{ mt: 1 }}
									>
										• {errMsg}
									</Typography>
								),
							)}
						</Box>
					)}
					<Box
						sx={{
							mt: 3,
							display: "flex",
							justifyContent: "center",
							gap: 2,
						}}
					>
						<RouterLink to="/home" style={{ textDecoration: "none" }}>
							<Box
								component="button"
								sx={{
									px: 4,
									py: 1.5,
									borderRadius: 2,
									backgroundColor: "primary.main",
									color: "white",
									border: "none",
									cursor: "pointer",
									"&:hover": {
										backgroundColor: "primary.dark",
									},
								}}
							>
								Go to Home
							</Box>
						</RouterLink>
						<Box
							component="button"
							sx={{
								px: 4,
								py: 1.5,
								borderRadius: 2,
								backgroundColor: "grey.300",
								color: "text.primary",
								border: "none",
								cursor: "pointer",
								"&:hover": {
									backgroundColor: "grey.400",
								},
							}}
							onClick={() => window.location.reload()}
						>
							Reload Page
						</Box>
					</Box>
				</Box>
			</Box>
		);
	}

	const user = userData.getUsers.items[0];

	return (
		<Box
			sx={{
				minHeight: "100vh",
				py: 4,
				px: 2,
				display: "flex",
				justifyContent: "center",
			}}
		>
			<Card sx={{ maxWidth: 800, width: "100%", borderRadius: 2 }}>
				<CardHeader
					avatar={
						<Avatar
							sx={{ width: 64, height: 64 }}
							src={user.profilePictureUrl || undefined}
							alt={user.username || "User"}
						/>
					}
					title={
						<Typography variant="h6" fontWeight="bold">
							{user.firstName} {user.lastName}
						</Typography>
					}
					subheader={
						<Typography variant="body2" color="text.secondary">
							@{user.username}
						</Typography>
					}
					action={
						<Box>
							<Tooltip title="Add Friend">
								<IconButton aria-label="add friend" onClick={handleAddFriend}>
									<PersonAddIcon />
								</IconButton>
							</Tooltip>
							<RouterLink to="/users/$id/reports" params={{ id: user.id }}>
								Reports
							</RouterLink>
							<Tooltip title="Send Message">
								<IconButton
									aria-label="send message"
									onClick={handleSendMessage}
								>
									<MessageIcon />
								</IconButton>
							</Tooltip>
							<ReportButton reportTarget={user} />
						</Box>
					}
					sx={{ pb: 1 }}
				/>

				{/* USER INFO CONTENT */}
				<CardContent>
					{/* STATS SECTION */}
					<Grid container spacing={2} mb={2}>
						<Grid item xs={12} sm={6}>
							<Typography variant="subtitle2" color="text.secondary">
								Email:
							</Typography>
							<Typography variant="body1">{user.email}</Typography>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography variant="subtitle2" color="text.secondary">
								Friends:
							</Typography>
							<Typography variant="body1">{user.friendsCount ?? 0}</Typography>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography variant="subtitle2" color="text.secondary">
								Groups Joined:
							</Typography>
							<Typography variant="body1">
								{user.joinedGroupsCount ?? 0}
							</Typography>
						</Grid>
						{/* You can add more stats here if needed */}
					</Grid>

					<Divider sx={{ mb: 2 }} />

					{/* FRIENDS SECTION */}
					<FriendsList friendOf={id} />

					<Divider sx={{ my: 2 }} />

					{/* DATE INFO */}
					<Box mb={2}>
						<Typography variant="subtitle2" color="text.secondary">
							Member Since:
						</Typography>
						<Typography variant="body2" mb={1}>
							{new Date(user.createdAt).toLocaleDateString()}
						</Typography>
						<Typography variant="subtitle2" color="text.secondary">
							Last Updated:
						</Typography>
						<Typography variant="body2">
							{new Date(user.updatedAt).toLocaleDateString()}
						</Typography>
					</Box>

					{/* TAB SECTION */}
					<Box sx={{ borderTop: 1, borderColor: "divider", mt: 2 }}>
						<Tabs
							value={tabValue}
							onChange={handleTabChange}
							variant="fullWidth"
							sx={{ mb: 2 }}
							aria-label="profile tabs"
						>
							<Tab label="Posts" id="tab-0" aria-controls="tabpanel-0" />
							<Tab label="Comments" id="tab-1" aria-controls="tabpanel-1" />
							<Tab label="Reactions" id="tab-2" aria-controls="tabpanel-2" />
						</Tabs>

						{/* Tab Panels */}
						{tabValue === 0 && <UserPosts userId={id} />}
						{tabValue === 1 && <UserComments userId={id} />}
						{tabValue === 2 && <UserReactions userId={id} />}
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
}

export default RouteComponent;
