import { RouterLink } from "@Components/navigation/routerLink";
import FriendsList from "@Components/profile/FriendsList";
import UserComments from "@Components/profile/UserComments";
import UserPosts from "@Components/profile/UserPosts";
import UserReactions from "@Components/profile/UserReactions";
import { ReportButton } from "@Components/report/ReportButton";
import { GET_ERROR_LIST } from "@Utils/getResponseError";
import { PersonAdd, Message, Report } from "@mui/icons-material";
import {
	Box,
	Container,
	Paper,
	Avatar,
	Typography,
	IconButton,
	Tooltip,
	Stack,
	Tabs,
	Tab,
	CircularProgress,
	Button,
	Divider,
	Grid,
	Dialog,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

// If your enum is numeric: { PUBLIC = 0, ONLY_FRIENDS = 1, PRIVATE = 2 }
// Or if it's string-based, adjust accordingly.
import { ProfileVisibility, useGetUserQuery } from "../../../../../shared";

// Import the overlay
import { ProfileVisibilityOverlay } from "@Components/profile/ProfileVisibilityOverlay";

export const Route = createFileRoute("/users/$id/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [isProfileImageOpen, setIsProfileImageOpen] = useState(false);
	const { id } = Route.useParams();
	const [tabValue, setTabValue] = useState<number>(0);

	// Fetch user data
	const {
		data: userData,
		isLoading: userLoading,
		isError: userError,
		error: userErrorMessage,
	} = useGetUserQuery({ userId: id });

	// Handle tab change
	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	// Loading state
	if (userLoading) {
		return (
			<Box display='flex' justifyContent='center' alignItems='center' height='80vh'>
				<CircularProgress />
			</Box>
		);
	}

	// Error or user not found
	if (userError || !userData?.getUsers?.items?.length) {
		return (
			<Container maxWidth='md' sx={{ mt: 4 }}>
				<Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: "center" }}>
					<Typography variant='h4' color='error' gutterBottom fontWeight='bold'>
						{userError ? "Something Went Wrong" : "User Not Found"}
					</Typography>
					<Typography color='text.secondary' sx={{ mb: 3 }}>
						{userError
							? "We encountered an issue while fetching the user data. Please try again later."
							: "The user you're looking for doesn't exist or may have been removed."}
					</Typography>

					{GET_ERROR_LIST(userErrorMessage).length > 0 && (
						<Box sx={{ maxWidth: 400, mx: "auto", mb: 3 }}>
							<Typography variant='subtitle1' color='error' fontWeight='bold'>
								Error Details:
							</Typography>
							{GET_ERROR_LIST(userErrorMessage).map((errMsg: string, index: number) => (
								<Typography key={index} color='text.secondary' sx={{ mt: 1 }}>
									• {errMsg}
								</Typography>
							))}
						</Box>
					)}

					<Stack direction='row' spacing={2} justifyContent='center'>
						<RouterLink to='/' style={{ textDecoration: "none" }}>
							<Button variant='contained' size='large'>
								Go to Home
							</Button>
						</RouterLink>
						<Button variant='outlined' size='large' onClick={() => window.location.reload()}>
							Reload Page
						</Button>
					</Stack>
				</Paper>
			</Container>
		);
	}

	// We have user data
	const user = userData.getUsers.items[0];
	const fullName = `${user.firstName} ${user.lastName}`.trim();

	// Example flags to check if we're the owner or a friend:
	const myUserId = "1234";
	const isOwner = myUserId === user.id;
	const isFriend = false; // or check your friend relationships

	return (
		<Container maxWidth='lg' sx={{ py: 1 }}>
			<Paper
				elevation={3}
				sx={{
					borderRadius: 2,
					overflow: "hidden",
					background: "linear-gradient(to bottom right, #fff, #f7f9fc)",
				}}
			>
				{/* Header Banner (always visible) */}
				<Box
					sx={{
						background: `linear-gradient(${user.userConfiguration?.profileBackgroundLightAngle}deg, ${
							user?.userConfiguration?.profileBackgroundColor1
						} 30%, ${user?.userConfiguration?.profileBackgroundColor2} 90%)`,
						height: 140,
						position: "relative",
					}}
				/>

				{/* Top section with avatar, name, and action buttons (always visible) */}
				<Box sx={{ px: 4, pb: 0 }}>
					<Box
						sx={{
							position: "relative",
							mt: -5,
							mb: 3,
							display: "flex",
							justifyContent: "space-between",
							alignItems: "flex-end",
						}}
					>
						<Box
							sx={{
								position: "relative",
								display: "flex",
								alignItems: "center",
							}}
						>
							<Avatar
								src={user.profilePictureUrl || undefined}
								alt={fullName}
								onClick={() => setIsProfileImageOpen(true)}
								sx={{
									width: 120,
									height: 120,
									border: "4px solid white",
									boxShadow: 2,
									zIndex: 1,
									cursor: "pointer",
								}}
							/>
							<Box
								sx={{
									backgroundColor: "white",
									borderRadius: "0 50px 50px 0",
									boxShadow: 2,
									py: 2,
									px: 4,
									ml: -4,
									pl: 6,
								}}
							>
								<Typography variant='h5' fontWeight='bold' sx={{ lineHeight: 1.2 }}>
									{fullName}
								</Typography>
								<Typography variant='subtitle2' color='text.secondary'>
									@{user.username}
								</Typography>
							</Box>
						</Box>
						<Stack direction='row' spacing={1} alignItems='flex-end'>
							<Tooltip title='Add Friend'>
								<IconButton
									sx={{
										bgcolor: "background.paper",
										"&:hover": { bgcolor: "grey.100" },
									}}
								>
									<PersonAdd />
								</IconButton>
							</Tooltip>
							<Tooltip title='Send Message'>
								<IconButton
									sx={{
										bgcolor: "background.paper",
										"&:hover": { bgcolor: "grey.100" },
									}}
								>
									<Message />
								</IconButton>
							</Tooltip>
							<Tooltip title='View Reports'>
								<RouterLink to={`/users/${user.id}/reports`} style={{ color: "inherit" }}>
									<IconButton
										sx={{
											bgcolor: "background.paper",
											"&:hover": { bgcolor: "grey.100" },
										}}
									>
										<Report />
									</IconButton>
								</RouterLink>
							</Tooltip>
							<ReportButton reportTarget={user} />
						</Stack>
					</Box>
				</Box>

				{/* Now wrap the REMAINING content in the overlay */}
				<ProfileVisibilityOverlay
					visibility={user.userConfiguration?.profileVisibility ?? ProfileVisibility.Public}
					isOwner={isOwner}
					isFriend={isFriend}
				>
					<Box sx={{ px: 4, pb: 4 }}>
						{/* User Details */}
						<Grid container spacing={3} sx={{ mt: 1 }}>
							<Grid item xs={12} sm={6} md={4}>
								<Typography variant='body2' color='text.secondary'>
									Email
								</Typography>
								<Typography variant='body1' gutterBottom>
									{user.email}
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6} md={4}>
								<Typography variant='body2' color='text.secondary'>
									Friends
								</Typography>
								<Typography variant='body1' gutterBottom>
									{user.friendsCount ?? 0}
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6} md={4}>
								<Typography variant='body2' color='text.secondary'>
									Groups
								</Typography>
								<Typography variant='body1' gutterBottom>
									{user.joinedGroupsCount ?? 0}
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6} md={4}>
								<Typography variant='body2' color='text.secondary'>
									Member Since
								</Typography>
								<Typography variant='body1' gutterBottom>
									{new Date(user.createdAt).toLocaleDateString()}
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6} md={4}>
								<Typography variant='body2' color='text.secondary'>
									Last Updated
								</Typography>
								<Typography variant='body1' gutterBottom>
									{new Date(user.updatedAt).toLocaleDateString()}
								</Typography>
							</Grid>
						</Grid>

						<Divider sx={{ my: 4 }} />

						{/* Friends Section */}
						<FriendsList friendOf={id} />

						<Divider sx={{ my: 4 }} />

						{/* Content Tabs */}
						<Tabs
							value={tabValue}
							onChange={handleTabChange}
							variant='fullWidth'
							sx={{
								mb: 3,
								"& .MuiTab-root": {
									py: 1.5,
								},
							}}
						>
							<Tab label='Posts' />
							<Tab label='Comments' />
							<Tab label='Reactions' />
						</Tabs>

						{tabValue === 0 && <UserPosts userId={id} />}
						{tabValue === 1 && <UserComments userId={id} />}
						{tabValue === 2 && <UserReactions userId={id} />}
					</Box>
				</ProfileVisibilityOverlay>
			</Paper>

			{/* Profile Image Modal */}
			<Dialog
				open={isProfileImageOpen}
				onClose={() => setIsProfileImageOpen(false)}
				maxWidth='lg'
				PaperProps={{
					sx: {
						backgroundColor: "transparent",
						boxShadow: "none",
					},
				}}
			>
				<Box
					component='img'
					src={user.profilePictureUrl ?? ""}
					alt={`${fullName}'s profile picture`}
					sx={{
						maxWidth: "90vw",
						maxHeight: "90vh",
						objectFit: "contain",
					}}
				/>
			</Dialog>
		</Container>
	);
}

export default RouteComponent;
