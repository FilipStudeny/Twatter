// RouteComponent.tsx

import FriendsList from "@Components/profile/FriendsList";
import { PersonAdd as PersonAddIcon, Message as MessageIcon, Report as ReportIcon } from "@mui/icons-material";
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

import { useGetUserQuery } from "../../../../shared";

export const Route = createFileRoute("/profile/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();

	const [tabValue, setTabValue] = useState(0);

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
	};

	const handleSendMessage = () => {
		console.log("Send Message clicked");
	};

	const handleReportUser = () => {
		console.log("Report User clicked");
	};

	if (userLoading) {
		return (
			<Box p={2} display='flex' justifyContent='center' alignItems='center'>
				<CircularProgress />
			</Box>
		);
	}

	if (userError || !userData?.getUsers?.items?.length) {
		return (
			<Box p={2}>
				<Typography variant='h6' color='error'>
					Error: User not found.
				</Typography>
				<Typography variant='body2' color='error'>
					{userErrorMessage?.message ?? ""}
				</Typography>
			</Box>
		);
	}

	const user = userData.getUsers.items[0];

	return (
		<Box
			sx={{
				minHeight: "100vh",
				bgcolor: "background.default",
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
						<Typography variant='h6' fontWeight='bold'>
							{user.firstName} {user.lastName}
						</Typography>
					}
					subheader={
						<Typography variant='body2' color='text.secondary'>
							@{user.username}
						</Typography>
					}
					action={
						<Box>
							<Tooltip title='Add Friend'>
								<IconButton aria-label='add friend' onClick={handleAddFriend}>
									<PersonAddIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title='Send Message'>
								<IconButton aria-label='send message' onClick={handleSendMessage}>
									<MessageIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title='Report User'>
								<IconButton aria-label='report user' onClick={handleReportUser}>
									<ReportIcon />
								</IconButton>
							</Tooltip>
						</Box>
					}
					sx={{ pb: 1 }}
				/>

				{/* USER INFO CONTENT */}
				<CardContent>
					{/* STATS SECTION */}
					<Grid container spacing={2} mb={2}>
						<Grid item xs={12} sm={6}>
							<Typography variant='subtitle2' color='text.secondary'>
								Email:
							</Typography>
							<Typography variant='body1'>{user.email}</Typography>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography variant='subtitle2' color='text.secondary'>
								Friends:
							</Typography>
							<Typography variant='body1'>{user.friendsCount ?? 0}</Typography>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography variant='subtitle2' color='text.secondary'>
								Groups Joined:
							</Typography>
							<Typography variant='body1'>{user.joinedGroupsCount ?? 0}</Typography>
						</Grid>
						{/* Removed other stats like Comments, Likes, etc. */}
					</Grid>

					<Divider sx={{ mb: 2 }} />

					{/* FRIENDS SECTION */}
					<FriendsList friendOf={id} />

					<Divider sx={{ my: 2 }} />

					{/* DATE INFO */}
					<Box mb={2}>
						<Typography variant='subtitle2' color='text.secondary'>
							Member Since:
						</Typography>
						<Typography variant='body2' mb={1}>
							{new Date(user.createdAt).toLocaleDateString()}
						</Typography>
						<Typography variant='subtitle2' color='text.secondary'>
							Last Updated:
						</Typography>
						<Typography variant='body2'>
							{new Date(user.updatedAt).toLocaleDateString()}
						</Typography>
					</Box>

					{/* TAB SECTION */}
					<Box sx={{ borderTop: 1, borderColor: "divider", mt: 2 }}>
						<Tabs value={tabValue} onChange={handleTabChange} variant='fullWidth' sx={{ mb: 2 }}>
							<Tab label='Posts' />
							<Tab label='Comments' />
							<Tab label='Reactions' />
						</Tabs>

						{/* Tab Panels */}
						{tabValue === 0 && (
							<Box sx={{ px: 2, py: 1 }}>
								<Typography variant='subtitle2' gutterBottom>
									User Posts
								</Typography>
								{/* TODO: Render user’s posts here. E.g. <UserPostsList userId={user.id} /> */}
								<Typography variant='body2' color='text.secondary'>
									[Placeholder for user’s posts...]
								</Typography>
							</Box>
						)}
						{tabValue === 1 && (
							<Box sx={{ px: 2, py: 1 }}>
								<Typography variant='subtitle2' gutterBottom>
									User Comments
								</Typography>
								{/* TODO: Render user’s comments here. E.g. <UserCommentsList userId={user.id} /> */}
								<Typography variant='body2' color='text.secondary'>
									[Placeholder for user’s comments...]
								</Typography>
							</Box>
						)}
						{tabValue === 2 && (
							<Box sx={{ px: 2, py: 1 }}>
								<Typography variant='subtitle2' gutterBottom>
									User Reactions
								</Typography>
								{/* TODO: Render user’s reactions here. E.g. <UserReactionsList userId={user.id} /> */}
								<Typography variant='body2' color='text.secondary'>
									[Placeholder for user’s reactions on posts/comments...]
								</Typography>
							</Box>
						)}
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
}

export default RouteComponent;
