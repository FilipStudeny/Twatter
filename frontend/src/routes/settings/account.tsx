import { useAuthenticationStore } from "@Stores/authenticationStore";
import { Notifications, Save } from "@mui/icons-material";
import { Container, Paper, Box, Typography, Switch, Button, Grid, Alert, Snackbar, useTheme } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import React, { useState, ChangeEvent, useEffect } from "react";

// If you need the user ID from your auth store

// Your GQL hooks/queries
import {
	UpdateUserConfigurationDto,
	useGetUserConfigurationQuery,
	useUpdateUserConfigurationMutation,
} from "../../../../shared";

// -------------------------------------
// Route Definition
// -------------------------------------
export const Route = createFileRoute("/settings/account")({
	component: RouteComponent,
});

// -------------------------------------
// Form Data Interface
// -------------------------------------
interface FormData {
	friendRequest_Email_Notification: boolean,
	friendRequest_App_Notification: boolean,
	postReactedTo_Email_Notification: boolean,
	postReactedTo_App_Notification: boolean,
	commentReactedTo_Email_Notification: boolean,
	commentReactedTo_App_Notification: boolean,
}

function RouteComponent() {
	const { getUserData } = useAuthenticationStore();
	const userId = getUserData()?.id ?? "";

	const {
		data: userConfig,
		error: getConfigError,
		isError: isGetConfigError,
		isLoading: isGetConfigLoading,
	} = useGetUserConfigurationQuery({ userId });

	const { mutateAsync: updateUserConfiguration } = useUpdateUserConfigurationMutation();

	const [formData, setFormData] = useState<FormData>({
		friendRequest_Email_Notification: true,
		friendRequest_App_Notification: true,
		postReactedTo_Email_Notification: true,
		postReactedTo_App_Notification: true,
		commentReactedTo_Email_Notification: true,
		commentReactedTo_App_Notification: true,
	});

	useEffect(() => {
		if (!isGetConfigLoading && userConfig?.GetUserConfiguration) {
			const cfg = userConfig.GetUserConfiguration;
			setFormData({
				friendRequest_Email_Notification: cfg.friendRequest_Email_Notification ?? true,
				friendRequest_App_Notification: cfg.friendRequest_App_Notification ?? true,
				postReactedTo_Email_Notification: cfg.postReactedTo_Email_Notification ?? true,
				postReactedTo_App_Notification: cfg.postReactedTo_App_Notification ?? true,
				commentReactedTo_Email_Notification: cfg.commentReactedTo_Email_Notification ?? true,
				commentReactedTo_App_Notification: cfg.commentReactedTo_App_Notification ?? true,
			});
		}
	}, [isGetConfigLoading, userConfig]);

	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const handleCloseSnackbar = () => setSnackbarOpen(false);

	const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: checked,
		}));
	};

	const handleDisableAccount = () => {
		alert("Account has been disabled!");
	};

	const handleDeleteAccount = () => {
		alert("Account has been permanently deleted!");
	};

	const handleSaveConfiguration = async () => {
		try {
			const updateDto: UpdateUserConfigurationDto = {
				friendRequest_Email_Notification: formData.friendRequest_Email_Notification,
				friendRequest_App_Notification: formData.friendRequest_App_Notification,
				postReactedTo_Email_Notification: formData.postReactedTo_Email_Notification,
				postReactedTo_App_Notification: formData.postReactedTo_App_Notification,
				commentReactedTo_Email_Notification: formData.commentReactedTo_Email_Notification,
				commentReactedTo_App_Notification: formData.commentReactedTo_App_Notification,
			};

			const response = await updateUserConfiguration({ updateDto });

			setSnackbarMessage(response.UpdateUserConfiguration.message ?? "Changes saved successfully!");
			setSnackbarOpen(true);
		} catch (error) {
			console.error(error);
			setSnackbarMessage("Failed to save changes.");
			setSnackbarOpen(true);
		}
	};

	if (isGetConfigLoading) {
		return (
			<Container maxWidth='lg' sx={{ py: 6 }}>
				<Typography>Loading user settings...</Typography>
			</Container>
		);
	}

	if (isGetConfigError) {
		return (
			<Container maxWidth='lg' sx={{ py: 6 }}>
				<Alert severity='error' sx={{ marginTop: "5px" }}>
					Failed to load configuration: {String(getConfigError)}
				</Alert>
			</Container>
		);
	}

	return (
		<Container maxWidth='lg' sx={{ py: 6 }}>
			{/* Title/Heading */}
			<TitleSection />

			{/* Notifications */}
			<NotificationsSection formData={formData} onSwitchChange={handleSwitchChange} />

			{/* Critical Actions (Disable / Delete) */}
			<CriticalAccountActionsSection onDisable={handleDisableAccount} onDelete={handleDeleteAccount} />

			{/* Save Button */}
			<SaveButtonSection onSave={handleSaveConfiguration} />

			{/* Snackbar to confirm saves */}
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			>
				<Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: "100%" }}>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</Container>
	);
}

export default RouteComponent;

// #region Title
function TitleSection() {
	return (
		<Box
			sx={{
				backgroundColor: "white",
				color: "text.main",
				p: 4,
				borderRadius: 2,
				mb: 4,
			}}
		>
			<Typography variant='h4' sx={{ fontWeight: "medium" }}>
				Account Settings
			</Typography>
		</Box>
	);
}
// endregion

// #region Notifications settings
type NotificationsSectionProps = {
	formData: FormData,
	onSwitchChange: (e: ChangeEvent<HTMLInputElement>)=> void,
};

function NotificationsSection({ formData, onSwitchChange }: NotificationsSectionProps) {
	return (
		<Paper
			elevation={0}
			sx={{
				mb: 3,
				p: 3,
				backgroundColor: "white",
				borderRadius: (theme) => theme.shape.borderRadius,
			}}
		>
			<SectionHeader title='Notifications' icon={<Notifications />} />

			<Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
				{/* Friend Requests */}
				<Box>
					<Typography variant='subtitle1' fontWeight='600' sx={{ mb: 2 }}>
						Friend Requests
					</Typography>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
						<NotificationRow
							title='Email Notifications'
							description='Receive email notifications for friend requests'
							checked={formData.friendRequest_Email_Notification}
							name='friendRequest_Email_Notification'
							onSwitchChange={onSwitchChange}
						/>
						<NotificationRow
							title='App Notifications'
							description='Receive in-app notifications for friend requests'
							checked={formData.friendRequest_App_Notification}
							name='friendRequest_App_Notification'
							onSwitchChange={onSwitchChange}
						/>
					</Box>
				</Box>

				{/* Post Reactions */}
				<Box>
					<Typography variant='subtitle1' fontWeight='600' sx={{ mb: 2 }}>
						Post Reactions
					</Typography>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
						<NotificationRow
							title='Email Notifications'
							description='Receive email notifications when someone reacts to your posts'
							checked={formData.postReactedTo_Email_Notification}
							name='postReactedTo_Email_Notification'
							onSwitchChange={onSwitchChange}
						/>
						<NotificationRow
							title='App Notifications'
							description='Receive in-app notifications when someone reacts to your posts'
							checked={formData.postReactedTo_App_Notification}
							name='postReactedTo_App_Notification'
							onSwitchChange={onSwitchChange}
						/>
					</Box>
				</Box>

				{/* Comment Reactions */}
				<Box>
					<Typography variant='subtitle1' fontWeight='600' sx={{ mb: 2 }}>
						Comment Reactions
					</Typography>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
						<NotificationRow
							title='Email Notifications'
							description='Receive email notifications when someone reacts to your comments'
							checked={formData.commentReactedTo_Email_Notification}
							name='commentReactedTo_Email_Notification'
							onSwitchChange={onSwitchChange}
						/>
						<NotificationRow
							title='App Notifications'
							description='Receive in-app notifications when someone reacts to your comments'
							checked={formData.commentReactedTo_App_Notification}
							name='commentReactedTo_App_Notification'
							onSwitchChange={onSwitchChange}
						/>
					</Box>
				</Box>
			</Box>
		</Paper>
	);
}

/**
 * Reusable row for a single switch toggling
 */
function NotificationRow({
	title,
	description,
	checked,
	name,
	onSwitchChange,
}: {
	title: string,
	description: string,
	checked: boolean,
	name: string,
	onSwitchChange: (e: ChangeEvent<HTMLInputElement>)=> void,
}) {
	const theme = useTheme();

	return (
		<Box
			sx={{
				p: 2.5,
				borderRadius: theme.shape.borderRadius,
				border: `1px solid ${theme.palette.divider}`,
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<Box>
				<Typography variant='subtitle1' fontWeight='500'>
					{title}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					{description}
				</Typography>
			</Box>
			<Switch checked={checked} onChange={onSwitchChange} name={name} />
		</Box>
	);
}

function SectionHeader({ title, icon }: { title: string, icon: React.ReactNode }) {
	const theme = useTheme();

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				gap: 1.5,
				mb: 3,
				pb: 2,
				borderBottom: `1px solid ${theme.palette.divider}`,
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					p: 1,
					borderRadius: 1,
					backgroundColor: theme.palette.primary.main + "10",
					color: theme.palette.primary.main,
				}}
			>
				{icon}
			</Box>
			<Typography variant='h6' fontWeight='600'>
				{title}
			</Typography>
		</Box>
	);
}
// endregion

// #region Critical settings Dissable/Delete account
type CriticalAccountActionsProps = {
	onDisable: ()=> void,
	onDelete: ()=> void,
};

function CriticalAccountActionsSection({ onDisable, onDelete }: CriticalAccountActionsProps) {
	const theme = useTheme();

	return (
		<Paper
			elevation={0}
			sx={{
				mt: 6,
				backgroundColor: "white",
				borderRadius: theme.shape.borderRadius,
				overflow: "hidden",
			}}
		>
			{/* Header */}
			<Box
				sx={{
					p: 3,
					borderBottom: `1px solid ${theme.palette.divider}`,
					backgroundColor: theme.palette.error.main + "08",
				}}
			>
				<Typography variant='h5' sx={{ color: theme.palette.error.main, fontWeight: 600 }}>
					Critical Account Actions
				</Typography>
				<Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
					Please be careful with these actions as they will affect your account's functionality
				</Typography>
			</Box>

			{/* Disable Account */}
			<Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
				<Box sx={{ mb: 3 }}>
					<Typography variant='h6' fontWeight='500'>
						Disable Account
					</Typography>
					<Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
						Disabling your account will:
					</Typography>
					<ul style={{ color: theme.palette.text.secondary, marginTop: 8 }}>
						<li>Hide your profile from other users</li>
						<li>Prevent others from interacting with your content</li>
						<li>Temporarily suspend your ability to post or interact</li>
						<li>Keep your data intact for when you decide to return</li>
					</ul>
					<Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
						You can reactivate your account at any time by logging in.
					</Typography>
				</Box>
				<Button variant='outlined' color='warning' sx={{ fontWeight: 600 }} onClick={onDisable}>
					Disable My Account
				</Button>
			</Box>

			{/* Delete Account Section */}
			<Box
				sx={{
					p: 3,
					bgcolor: theme.palette.error.main + "08",
				}}
			>
				<Box sx={{ mb: 3 }}>
					<Typography variant='h6' fontWeight='500' color='error'>
						Delete Account Permanently
					</Typography>
					<Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
						Deleting your account will:
					</Typography>
					<ul style={{ color: theme.palette.text.secondary, marginTop: 8 }}>
						<li>Permanently delete all your data and content</li>
						<li>Remove all your posts, comments, and interactions</li>
						<li>Delete your profile and personal information</li>
						<li>Cancel all your connections and friend relationships</li>
					</ul>
					<Typography
						variant='body2'
						sx={{
							mt: 2,
							color: theme.palette.error.main,
							fontWeight: 500,
						}}
					>
						⚠️ This action is permanent and cannot be undone
					</Typography>
				</Box>

				<Box
					sx={{
						p: 3,
						borderRadius: (theme) => theme.shape.borderRadius,
						border: (theme) => `1px solid ${theme.palette.error.main}`,
						bgcolor: "white",
					}}
				>
					<Typography variant='body1' fontWeight='500' sx={{ mb: 2 }}>
						To delete your account, please enter your password:
					</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Box component='form' onSubmit={(e) => e.preventDefault()}>
								<input type='password' placeholder='Enter your password' />
								{/*
                  <TextField fullWidth type="password" label="Enter your password" />
                */}
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Button variant='contained' color='error' sx={{ fontWeight: 600 }} onClick={onDelete}>
								I understand, permanently delete my account
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Paper>
	);
}
// endregion

// #region SaveButton
function SaveButtonSection({ onSave }: { onSave: ()=> void }) {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "flex-end",
				gap: 2,
				mt: 4,
				backgroundColor: "white",
				p: 3,
				borderRadius: 2,
			}}
		>
			<Button variant='outlined' size='large'>
				Cancel
			</Button>
			<Button
				variant='contained'
				color='primary'
				startIcon={<Save />}
				size='large'
				sx={{ fontWeight: 600 }}
				onClick={onSave}
			>
				Save Changes
			</Button>
		</Box>
	);
}
// endregion

