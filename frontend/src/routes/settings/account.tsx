import { Language, Notifications, Person, PhotoCamera, Save, Security } from "@mui/icons-material";
import {
	Container,
	Paper,
	Box,
	TextField,
	Button,
	Grid,
	SelectChangeEvent,
	Typography,
	useTheme,
	MenuItem,
	FormControl,
	Select,
	InputLabel,
	Switch,
	Avatar,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useState, ChangeEvent } from "react";

export const Route = createFileRoute("/settings/account")({
	component: RouteComponent,
});

interface FormData {
	fullName: string,
	email: string,
	phone: string,
	language: string,
	timezone: string,
	twoFactorAuth: boolean,
	profileBackgroundColor1: string,
	profileBackgroundColor2: string,
	// Notification settings
	friendRequest_Email_Notification: boolean,
	friendRequest_App_Notification: boolean,
	postReactedTo_Email_Notification: boolean,
	postReactedTo_App_Notification: boolean,
	commentReactedTo_Email_Notification: boolean,
	commentReactedTo_App_Notification: boolean,
}

function RouteComponent() {
	const theme = useTheme();
	const [formData, setFormData] = useState<FormData>({
		fullName: "John Doe",
		email: "john.doe@example.com",
		phone: "+1 234 567 8900",
		language: "English",
		timezone: "UTC-5",
		twoFactorAuth: false,
		profileBackgroundColor1: "#6a11cb",
		profileBackgroundColor2: "#2575fc",
		// Notification defaults
		friendRequest_Email_Notification: true,
		friendRequest_App_Notification: true,
		postReactedTo_Email_Notification: true,
		postReactedTo_App_Notification: true,
		commentReactedTo_Email_Notification: true,
		commentReactedTo_App_Notification: true,
	});

	const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: checked,
		}));
	};

	const SectionHeader = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
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

	return (
		<Container maxWidth='lg' sx={{ py: 4 }}>
			{/* Header */}
			<Box
				sx={{
					mb: 4,
					p: 3,
					borderRadius: theme.shape.borderRadius,
					background: "white",
					boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
				}}
			>
				<Typography variant='h4' fontWeight='700' sx={{ color: theme.palette.text.primary }}>
					Account Settings
				</Typography>
				<Typography variant='body1' color='text.secondary' sx={{ mt: 1 }}>
					Manage your account settings and preferences
				</Typography>
			</Box>

			{/* Profile Section */}
			<Paper
				elevation={0}
				sx={{
					mb: 3,
					p: 3,
					backgroundColor: "white",
					borderRadius: theme.shape.borderRadius,
				}}
			>
				<SectionHeader icon={<Person />} title='Profile Information' />
				<Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 3,
							p: 3,
							bgcolor: theme.palette.grey[50],
							borderRadius: theme.shape.borderRadius,
						}}
					>
						<Avatar sx={{ width: 100, height: 100 }}>JD</Avatar>
						<Box>
							<Typography variant='subtitle1' fontWeight='500'>
								Profile Picture
							</Typography>
							<Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
								Upload a new profile picture
							</Typography>
							<Button variant='outlined' startIcon={<PhotoCamera />} component='label' size='small'>
								Upload Photo
								<input hidden accept='image/*' type='file' />
							</Button>
						</Box>
					</Box>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label='Full Name'
								name='fullName'
								value={formData.fullName}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label='Email'
								name='email'
								type='email'
								value={formData.email}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label='Phone Number'
								name='phone'
								value={formData.phone}
								onChange={handleInputChange}
							/>
						</Grid>
					</Grid>
				</Box>
			</Paper>

			{/* Security Section */}
			<Paper
				elevation={0}
				sx={{
					mb: 3,
					p: 3,
					backgroundColor: "white",
					borderRadius: theme.shape.borderRadius,
				}}
			>
				<SectionHeader icon={<Security />} title='Security' />
				<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
								Two-Factor Authentication
							</Typography>
							<Typography variant='body2' color='text.secondary'>
								Add an extra layer of security to your account
							</Typography>
						</Box>
						<Switch
							checked={formData.twoFactorAuth}
							onChange={handleSwitchChange}
							name='twoFactorAuth'
						/>
					</Box>
					<Box sx={{ display: "flex", gap: 2 }}>
						<Button
							variant='contained'
							color='primary'
							startIcon={<Security />}
							sx={{ fontWeight: 600 }}
						>
							Change Password
						</Button>
						<Button color='error' variant='outlined' sx={{ fontWeight: 600 }}>
							Delete Account
						</Button>
					</Box>
				</Box>
			</Paper>

			{/* Notifications Section */}
			<Paper
				elevation={0}
				sx={{
					mb: 3,
					p: 3,
					backgroundColor: "white",
					borderRadius: theme.shape.borderRadius,
				}}
			>
				<SectionHeader icon={<Notifications />} title='Notifications' />
				<Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
					{/* Friend Requests */}
					<Box>
						<Typography variant='subtitle1' fontWeight='600' sx={{ mb: 2 }}>
							Friend Requests
						</Typography>
						<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
										Email Notifications
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										Receive email notifications for friend requests
									</Typography>
								</Box>
								<Switch
									checked={formData.friendRequest_Email_Notification}
									onChange={handleSwitchChange}
									name='friendRequest_Email_Notification'
								/>
							</Box>
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
										App Notifications
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										Receive in-app notifications for friend requests
									</Typography>
								</Box>
								<Switch
									checked={formData.friendRequest_App_Notification}
									onChange={handleSwitchChange}
									name='friendRequest_App_Notification'
								/>
							</Box>
						</Box>
					</Box>

					{/* Post Reactions */}
					<Box>
						<Typography variant='subtitle1' fontWeight='600' sx={{ mb: 2 }}>
							Post Reactions
						</Typography>
						<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
										Email Notifications
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										Receive email notifications when someone reacts to your posts
									</Typography>
								</Box>
								<Switch
									checked={formData.postReactedTo_Email_Notification}
									onChange={handleSwitchChange}
									name='postReactedTo_Email_Notification'
								/>
							</Box>
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
										App Notifications
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										Receive in-app notifications when someone reacts to your posts
									</Typography>
								</Box>
								<Switch
									checked={formData.postReactedTo_App_Notification}
									onChange={handleSwitchChange}
									name='postReactedTo_App_Notification'
								/>
							</Box>
						</Box>
					</Box>

					{/* Comment Reactions */}
					<Box>
						<Typography variant='subtitle1' fontWeight='600' sx={{ mb: 2 }}>
							Comment Reactions
						</Typography>
						<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
										Email Notifications
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										Receive email notifications when someone reacts to your comments
									</Typography>
								</Box>
								<Switch
									checked={formData.commentReactedTo_Email_Notification}
									onChange={handleSwitchChange}
									name='commentReactedTo_Email_Notification'
								/>
							</Box>
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
										App Notifications
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										Receive in-app notifications when someone reacts to your comments
									</Typography>
								</Box>
								<Switch
									checked={formData.commentReactedTo_App_Notification}
									onChange={handleSwitchChange}
									name='commentReactedTo_App_Notification'
								/>
							</Box>
						</Box>
					</Box>
				</Box>
			</Paper>

			{/* Preferences Section */}
			<Paper
				elevation={0}
				sx={{
					mb: 3,
					p: 3,
					backgroundColor: "white",
					borderRadius: theme.shape.borderRadius,
				}}
			>
				<SectionHeader icon={<Language />} title='Preferences' />
				<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
					<FormControl fullWidth>
						<InputLabel id='language-label'>Language</InputLabel>
						<Select
							labelId='language-label'
							name='language'
							value={formData.language}
							onChange={handleInputChange}
							label='Language'
						>
							<MenuItem value='English'>English</MenuItem>
							<MenuItem value='Spanish'>Spanish</MenuItem>
							<MenuItem value='French'>French</MenuItem>
						</Select>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel id='timezone-label'>Timezone</InputLabel>
						<Select
							labelId='timezone-label'
							name='timezone'
							value={formData.timezone}
							onChange={handleInputChange}
							label='Timezone'
						>
							<MenuItem value='UTC-5'>Eastern Time (UTC-5)</MenuItem>
							<MenuItem value='UTC-8'>Pacific Time (UTC-8)</MenuItem>
							<MenuItem value='UTC+1'>Central European Time (UTC+1)</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</Paper>
			{/* Critical Actions Section */}
			<Paper
				elevation={0}
				sx={{
					mt: 6,
					backgroundColor: "white",
					borderRadius: theme.shape.borderRadius,
					overflow: "hidden",
				}}
			>
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

				{/* Disable Account Section */}
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
					<Button
						variant='outlined'
						color='warning'
						sx={{ fontWeight: 600 }}
						onClick={() => {
							/* handle disable */
						}}
					>
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
							borderRadius: theme.shape.borderRadius,
							border: `1px solid ${theme.palette.error.main}`,
							bgcolor: "white",
						}}
					>
						<Typography variant='body1' fontWeight='500' sx={{ mb: 2 }}>
							To delete your account, please enter your password:
						</Typography>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<TextField
									fullWidth
									type='password'
									label='Enter your password'
									name='deleteAccountPassword'
									required
									sx={{
										"& .MuiOutlinedInput-root": {
											"&.Mui-focused fieldset": {
												borderColor: theme.palette.error.main,
											},
										},
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<Button
									variant='contained'
									color='error'
									sx={{ fontWeight: 600 }}
									onClick={() => {
										/* handle delete */
									}}
								>
									I understand, permanently delete my account
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Paper>

			{/* Save Button */}
			<Box
				sx={{
					display: "flex",
					justifyContent: "flex-end",
					gap: 2,
					mt: 4,
					backgroundColor: "white",
					p: 3,
					borderRadius: theme.shape.borderRadius,
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
				>
					Save Changes
				</Button>
			</Box>
		</Container>
	);
}

export default RouteComponent;
