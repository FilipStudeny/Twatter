import { Box, Card, CardContent, CardHeader, Avatar, Typography, Button, Grid, Stack, Divider } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

import { useGetUserQuery } from "../../../../shared";

export const Route = createFileRoute("/profile/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();

	// Fetch user data via your custom hook
	const { data, isLoading, isError, error } = useGetUserQuery({ userId: id });

	if (isLoading) return <Box p={2}>Loading...</Box>;
	if (isError || !data?.getUsers?.items?.length) return <Box p={2}>Error: User not found.</Box>;

	// Extract the first user from the array (assuming only 1 user is returned)
	const user = data.getUsers.items[0];

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
			<Card sx={{ maxWidth: 600, width: "100%" }}>
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
				/>

				<CardContent>
					<Stack direction='row' spacing={2} mb={2}>
						{/* Add Friend */}
						<Button variant='contained' color='primary'>
							Add Friend
						</Button>

						{/* Send Message */}
						<Button variant='contained' color='success'>
							Send Message
						</Button>

						{/* Report User */}
						<Button variant='contained' color='error'>
							Report User
						</Button>
					</Stack>

					<Divider sx={{ mb: 2 }} />

					<Grid container spacing={2} mb={2}>
						<Grid item xs={6}>
							<Typography variant='subtitle2' color='text.secondary'>
								Email:
							</Typography>
							<Typography variant='body1'>{user.email}</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography variant='subtitle2' color='text.secondary'>
								Friends:
							</Typography>
							<Typography variant='body1'>{user.friendsCount ?? 0}</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography variant='subtitle2' color='text.secondary'>
								Groups Joined:
							</Typography>
							<Typography variant='body1'>{user.joinedGroupsCount ?? 0}</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography variant='subtitle2' color='text.secondary'>
								Likes:
							</Typography>
							<Typography variant='body1'>{user.likesCount ?? 0}</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography variant='subtitle2' color='text.secondary'>
								Comments:
							</Typography>
							<Typography variant='body1'>{user.commentsCount ?? 0}</Typography>
						</Grid>
					</Grid>

					<Divider sx={{ mb: 2 }} />

					<Box>
						<Typography variant='subtitle2' color='text.secondary'>
							Member Since:
						</Typography>
						<Typography variant='body2' mb={1}>
							{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
						</Typography>
						<Typography variant='subtitle2' color='text.secondary'>
							Last Updated:
						</Typography>
						<Typography variant='body2'>
							{user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "—"}
						</Typography>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
}
