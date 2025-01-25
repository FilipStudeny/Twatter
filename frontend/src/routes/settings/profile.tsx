import { ColorPicker } from "@Components/ColorPicker";
import DirectionPicker from "@Components/DirectionPicker";
import { LoadingSkeleton } from "@Components/profile/settings/profileSkeleton";
import { useAuthenticationStore } from "@Stores/authenticationStore";
import { popularColors } from "@Utils/colors";
import { GET_ERROR_LIST } from "@Utils/getResponseError";
import { LockOutlined, PublicOutlined, PeopleOutline, Undo as UndoIcon, SaveOutlined } from "@mui/icons-material";
import {
	Box,
	Container,
	Typography,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Button,
	Paper,
	Stack,
	IconButton,
	Tooltip,
	Alert,
	Snackbar,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";

import {
	ProfileVisibility,
	UpdateUserConfigurationDto,
	useGetUserConfigurationQuery,
	useUpdateUserConfigurationMutation,
} from "../../../../shared";

export const Route = createFileRoute("/settings/profile")({
	component: RouteComponent,
});

function RouteComponent() {
	const defaultColors = {
		color1: "#2196F3",
		color2: "#21CBF3",
	};

	const { getUserData } = useAuthenticationStore();
	const userId = getUserData()?.id;

	const {
		data: userConfig,
		error: getConfigError,
		isError: isGetConfigError,
		isLoading: isGetConfigLoading,
	} = useGetUserConfigurationQuery({
		userId: userId ?? "",
	});

	const {
		mutateAsync: updateUserConfiguration,
		isError: isUpdateError,
		error: updateError,
	} = useUpdateUserConfigurationMutation();

	const [visibility, setVisibility] = useState<ProfileVisibility>(ProfileVisibility.Public);
	const [colors, setColors] = useState(defaultColors);
	const [angle, setAngle] = useState(45);

	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	useEffect(() => {
		if (userConfig?.GetUserConfiguration) {
			const cfg = userConfig.GetUserConfiguration;
			setVisibility(cfg.profileVisibility);
			setColors({
				color1: cfg.profileBackgroundColor1,
				color2: cfg.profileBackgroundColor2,
			});
			setAngle(cfg.profileBackgroundLightAngle);
		}
	}, [userConfig]);

	const handleSaveConfiguration = async () => {
		try {
			const updateDto: UpdateUserConfigurationDto = {
				profileBackgroundColor1: colors.color1,
				profileBackgroundColor2: colors.color2,
				profileBackgroundLightAngle: angle,
				profileVisibility: visibility,
			};

			const response = await updateUserConfiguration({ updateDto });
			const errorMessage = GET_ERROR_LIST(updateError);
			const message = isUpdateError ? errorMessage[0] : response.UpdateUserConfiguration.message;
			setSnackbarMessage(message ?? "");
			setSnackbarOpen(true);
		} catch (error) {
			console.error(error);
		}
	};

	// Reset everything
	const handleReset = () => {
		setColors(defaultColors);
		setAngle(45);
		setVisibility(ProfileVisibility.Public);
	};

	if (isGetConfigError) {
		return (
			<Container maxWidth='lg' sx={{ py: 6 }}>
				{GET_ERROR_LIST(getConfigError).map((errMsg: string, index: number) => (
					<Alert key={index} severity='error' sx={{ marginTop: "5px" }}>
						{errMsg}
					</Alert>
				))}
			</Container>
		);
	}

	if (isGetConfigLoading) {
		return (
			<Container maxWidth='lg' sx={{ py: 6 }}>
				<LoadingSkeleton />
			</Container>
		);
	}

	// #region Content
	return (
		<Container maxWidth='lg' sx={{ py: 6 }}>
			{/* Title Section */}
			<TitleSection />

			{/* Color Settings */}
			<ColorSettingsSection
				colors={colors}
				angle={angle}
				onColorChange={setColors}
				onAngleChange={setAngle}
				onReset={handleReset}
			/>

			{/* Visibility Settings */}
			<VisibilitySettingsSection visibility={visibility} onChangeVisibility={setVisibility} />

			{/* Save Button Section */}
			<SaveButtonSection onSave={handleSaveConfiguration} />

			{/* Snackbar for success feedback */}
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
// #endregion

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
				Profile Settings
			</Typography>
		</Box>
	);
}
// #endregion

// #region Profile banner
type ColorSettingsProps = {
	colors: { color1: string, color2: string },
	angle: number,
	onColorChange: React.Dispatch<React.SetStateAction<{ color1: string, color2: string }>>,
	onAngleChange: (angle: number)=> void,
	onReset: ()=> void,
};

function ColorSettingsSection({ colors, angle, onColorChange, onAngleChange, onReset }: ColorSettingsProps) {
	return (
		<Paper
			elevation={1}
			sx={{
				mb: 4,
				borderRadius: 3,
				p: 4,
			}}
		>
			<Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 3 }}>
				<Typography variant='h6' sx={{ fontWeight: "medium" }}>
					Profile Colors
				</Typography>
				<Tooltip title='Reset to default colors and angle'>
					<IconButton onClick={onReset} size='small'>
						<UndoIcon />
					</IconButton>
				</Tooltip>
			</Stack>

			<Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
				Choose colors for your profile banner and adjust its direction. These will be visible to others when
				they visit your profile.
			</Typography>

			<BannerPreview angle={angle} color1={colors.color1} color2={colors.color2} />

			<Stack direction='row' spacing={4} justifyContent={"space-between"} alignItems='center' sx={{ mb: 3 }}>
				{/* Primary Color */}
				<Box>
					<Typography variant='subtitle2' sx={{ mb: 2, fontWeight: "medium" }}>
						Primary Color
					</Typography>
					<ColorPicker
						value={colors.color1}
						onChange={(newColor) => onColorChange((prev) => ({ ...prev, color1: newColor }))}
						popularColors={popularColors}
						colorBoxSx={{ width: 180, height: 30 }}
					/>
				</Box>

				{/* Angle */}
				<Box display='flex' flexDirection='column' alignItems='center'>
					<Typography variant='body2' sx={{ mb: 1 }}>
						Color smoothing direction: <strong>{Math.round(angle)}°</strong>
					</Typography>
					<DirectionPicker value={angle} onChange={onAngleChange} size={100} />
				</Box>

				{/* Secondary Color */}
				<Box>
					<Typography variant='subtitle2' sx={{ mb: 2, fontWeight: "medium" }}>
						Secondary Color
					</Typography>
					<ColorPicker
						value={colors.color2}
						onChange={(newColor) => onColorChange((prev) => ({ ...prev, color2: newColor }))}
						popularColors={popularColors}
						colorBoxSx={{ width: 180, height: 30 }}
					/>
				</Box>
			</Stack>
		</Paper>
	);
}

type BannerPreviewProps = {
	angle: number,
	color1: string,
	color2: string,
};

function BannerPreview({ angle, color1, color2 }: BannerPreviewProps) {
	return (
		<Paper
			elevation={0}
			sx={{
				background: `linear-gradient(${angle}deg, ${color1} 30%, ${color2} 90%)`,
				height: 160,
				borderRadius: 2,
				mb: 3,
				position: "relative",
				overflow: "hidden",
				"&::before": {
					content: "\"\"",
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: "linear-gradient(180deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.08) 100%)",
					pointerEvents: "none",
				},
			}}
		/>
	);
}
// #endregion

// #region Visibility settings
type VisibilitySettingsProps = {
	visibility: ProfileVisibility,
	onChangeVisibility: React.Dispatch<React.SetStateAction<ProfileVisibility>>,
};

function VisibilitySettingsSection({ visibility, onChangeVisibility }: VisibilitySettingsProps) {
	return (
		<Paper
			elevation={1}
			sx={{
				mb: 4,
				borderRadius: 3,
				p: 4,
			}}
		>
			<Typography variant='h6' sx={{ mb: 3, fontWeight: "medium" }}>
				Profile Visibility
			</Typography>

			<Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
				Control who can view your profile information. You can change this setting at any time.
			</Typography>

			<FormControl component='fieldset'>
				<RadioGroup
					value={visibility}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						onChangeVisibility(event.target.value as ProfileVisibility)
					}
				>
					<FormControlLabel
						value={ProfileVisibility.Public}
						control={<Radio />}
						label={
							<Stack direction='row' spacing={1.5} alignItems='center'>
								<PublicOutlined color='action' />
								<Box>
									<Typography variant='body1'>Public</Typography>
									<Typography variant='body2' color='text.secondary'>
										Anyone can view your profile
									</Typography>
								</Box>
							</Stack>
						}
						sx={{ mb: 2 }}
					/>
					<FormControlLabel
						value={ProfileVisibility.OnlyFriends}
						control={<Radio />}
						label={
							<Stack direction='row' spacing={1.5} alignItems='center'>
								<PeopleOutline color='action' />
								<Box>
									<Typography variant='body1'>Friends Only</Typography>
									<Typography variant='body2' color='text.secondary'>
										Only your friends can view your profile
									</Typography>
								</Box>
							</Stack>
						}
						sx={{ mb: 2 }}
					/>
					<FormControlLabel
						value={ProfileVisibility.Private}
						control={<Radio />}
						label={
							<Stack direction='row' spacing={1.5} alignItems='center'>
								<LockOutlined color='action' />
								<Box>
									<Typography variant='body1'>Private</Typography>
									<Typography variant='body2' color='text.secondary'>
										Only you can view your profile
									</Typography>
								</Box>
							</Stack>
						}
					/>
				</RadioGroup>
			</FormControl>
		</Paper>
	);
}
// #endregion

// #region Save button
function SaveButtonSection({ onSave }: { onSave: ()=> void }) {
	return (
		<Paper
			elevation={1}
			sx={{
				p: 3,
				borderRadius: 3,
			}}
		>
			<Stack direction='row' justifyContent='flex-end'>
				<Button
					variant='contained'
					color='primary'
					onClick={onSave}
					size='large'
					sx={{
						px: 4,
						borderRadius: 2,
						textTransform: "none",
						fontWeight: "medium",
					}}
				>
					<SaveOutlined />
					&nbsp;Save Changes
				</Button>
			</Stack>
		</Paper>
	);
}
// #endregion

