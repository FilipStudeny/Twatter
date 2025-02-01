import { RouterLink } from "@Components/navigation/routerLink";
import FriendsList from "@Components/profile/FriendsList";
import { ProfileVisibilityOverlay } from "@Components/profile/ProfileVisibilityOverlay";
import UserComments from "@Components/profile/UserComments";
import UserPosts from "@Components/profile/UserPosts";
import UserReactions from "@Components/profile/UserReactions";
import { ReportButton } from "@Components/report/ReportButton";
import { useAuthenticationStore } from "@Stores/authenticationStore";
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

import {
	NotificationDto,
	NotificationType,
	ProfileVisibility,
	useGetUserQuery,
	useSendFriendRequestMutation,
} from "../../../../../shared";

export const Route = createFileRoute("/users/$id/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [isProfileImageOpen, setIsProfileImageOpen] = useState(false);
	const { id } = Route.useParams();
	const [tabValue, setTabValue] = useState<number>(0);

	const {
		data: userData,
		isLoading: userLoading,
		isError: userError,
		error: userErrorMessage,
	} = useGetUserQuery({ userId: id });

	const { mutateAsync: sendFriendRequest, isPending } = useSendFriendRequestMutation();
	const { getUserData } = useAuthenticationStore();

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	const handleSendFriendRequest = async () => {
		const authUserData = getUserData();
		const displayName =
			authUserData?.username ?? `${authUserData?.firstName ?? ""} ${authUserData?.lastName ?? ""}`.trim();
		const message = `${displayName} wants to be your friend`;
		const dto: NotificationDto = {
			receiverId: user.id,
			message,
			type: NotificationType.FriendRequest,
		};

		try {
			await sendFriendRequest({ dto });
		} catch (err) {
			console.error("Failed to send friend request", err);
		}
	};

	if (userLoading) {
		return <LoadingState />;
	}

	if (userError || !userData?.getUsers?.items?.length) {
		return <ErrorState errorMessage={userErrorMessage} onReload={() => window.location.reload()} />;
	}

	const user = userData.getUsers.items[0];
	const fullName = `${user.firstName} ${user.lastName}`.trim();

	const myUserId = "1234";
	const isOwner = myUserId === user.id;
	const isFriend = false;

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
				<Box
					sx={{
						background: `linear-gradient(${user.userConfiguration?.profileBackgroundLightAngle}deg, ${
							user?.userConfiguration?.profileBackgroundColor1
						} 30%, ${user?.userConfiguration?.profileBackgroundColor2} 90%)`,
						height: 140,
						position: "relative",
					}}
				/>
				<UserProfileHeader
					user={user}
					fullName={fullName}
					handleSendFriendRequest={handleSendFriendRequest}
					isPending={isPending}
					friendRequestSend={user.friendRequestSend ?? false}
					onAvatarClick={() => setIsProfileImageOpen(true)}
				/>
				<ProfileVisibilityOverlay
					visibility={user.userConfiguration?.profileVisibility ?? ProfileVisibility.Public}
					isOwner={isOwner}
					isFriend={isFriend}
				>
					<UserDetailsSection user={user} />
					<ContentTabsSection tabValue={tabValue} handleTabChange={handleTabChange} userId={id} />
				</ProfileVisibilityOverlay>
			</Paper>
			<ProfileImageModal
				isOpen={isProfileImageOpen}
				onClose={() => setIsProfileImageOpen(false)}
				imageUrl={user.profilePictureUrl ?? ""}
				fullName={fullName}
			/>
		</Container>
	);
}

export default RouteComponent;

function LoadingState() {
	return (
		<Box display='flex' justifyContent='center' alignItems='center' height='80vh'>
			<CircularProgress />
		</Box>
	);
}

// #region Error container
function ErrorState({ errorMessage, onReload }: { errorMessage: any, onReload: ()=> void }) {
	return (
		<Container maxWidth='md' sx={{ mt: 4 }}>
			<Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: "center" }}>
				<Typography variant='h4' color='error' gutterBottom fontWeight='bold'>
					{errorMessage ? "Something Went Wrong" : "User Not Found"}
				</Typography>
				<Typography color='text.secondary' sx={{ mb: 3 }}>
					{errorMessage
						? "We encountered an issue while fetching the user data. Please try again later."
						: "The user you're looking for doesn't exist or may have been removed."}
				</Typography>
				{GET_ERROR_LIST(errorMessage).length > 0 && (
					<Box sx={{ maxWidth: 400, mx: "auto", mb: 3 }}>
						<Typography variant='subtitle1' color='error' fontWeight='bold'>
							Error Details:
						</Typography>
						{GET_ERROR_LIST(errorMessage).map((errMsg: string, index: number) => (
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
					<Button variant='outlined' size='large' onClick={onReload}>
						Reload Page
					</Button>
				</Stack>
			</Paper>
		</Container>
	);
}
// #endregion

// #region Profile header
function UserProfileHeader({
	user,
	fullName,
	handleSendFriendRequest,
	isPending,
	friendRequestSend,
	onAvatarClick,
}: {
	user: any,
	fullName: string,
	handleSendFriendRequest: ()=> void,
	isPending: boolean,
	friendRequestSend?: boolean,
	onAvatarClick: ()=> void,
}) {
	return (
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
				{/* Avatar and Name */}
				<Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
					<Avatar
						src={user.profilePictureUrl || undefined}
						alt={fullName}
						onClick={onAvatarClick}
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
				{/* Action Buttons */}
				<Stack direction='row' spacing={1} alignItems='flex-end'>
					<Tooltip title='Add Friend'>
						<IconButton
							onClick={handleSendFriendRequest}
							disabled={isPending}
							color={friendRequestSend ? "error" : "primary"}
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
	);
}
// #endregion

// #region Profile details
function UserDetailsSection({ user }: { user: any }) {
	return (
		<Box sx={{ px: 4, pb: 4 }}>
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
			<FriendsList friendOf={user.id} />
		</Box>
	);
}
// #endregion

// #region Profile tabs
function ContentTabsSection({
	tabValue,
	handleTabChange,
	userId,
}: {
	tabValue: number,
	handleTabChange: (e: React.SyntheticEvent, newValue: number)=> void,
	userId: string,
}) {
	return (
		<Box sx={{ px: 4, pb: 4 }}>
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
			{tabValue === 0 && <UserPosts userId={userId} />}
			{tabValue === 1 && <UserComments userId={userId} />}
			{tabValue === 2 && <UserReactions userId={userId} />}
		</Box>
	);
}
// #endregion

// #region Profile image modal
function ProfileImageModal({
	isOpen,
	onClose,
	imageUrl,
	fullName,
}: {
	isOpen: boolean,
	onClose: ()=> void,
	imageUrl: string,
	fullName: string,
}) {
	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
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
				src={imageUrl ?? ""}
				alt={`${fullName}'s profile picture`}
				sx={{
					maxWidth: "90vw",
					maxHeight: "90vh",
					objectFit: "contain",
				}}
			/>
		</Dialog>
	);
}
// #endregion

