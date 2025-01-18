import { ColorPicker } from "@Components/ColorPicker";
import DirectionPicker from "@Components/DirectionPicker";
import { LockOutlined, PublicOutlined, PeopleOutline, Undo as UndoIcon } from "@mui/icons-material";
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
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";

export const Route = createFileRoute("/settings/profile")({
	component: RouteComponent,
});

function RouteComponent() {
	const defaultColors = {
		color1: "#2196F3",
		color2: "#21CBF3",
	};

	const [colors, setColors] = useState(defaultColors);
	const [visibility, setVisibility] = useState("all");

	const [angle, setAngle] = useState(45);

	const BannerPreview = () => (
		<Paper
			elevation={0}
			sx={{
				background: `linear-gradient(${angle}deg, ${colors.color1} 30%, ${colors.color2} 90%)`,
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

	const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setVisibility(event.target.value);
	};

	const handleSave = () => {
		console.log("Saving settings:", { colors, visibility, angle });
	};

	const handleReset = () => {
		setColors(defaultColors);
		setAngle(45);
	};

	const popularColors = [
		"#FF0000", // Red
		"#FF7F00", // Orange
		"#FFFF00", // Yellow
		"#00FF00", // Lime
		"#00FFFF", // Cyan
		"#0000FF", // Blue
		"#8B00FF", // Violet
		"#FF1493", // Deep Pink
		"#FF69B4", // Hot Pink
		"#FF00FF", // Magenta
		"#FF4500", // Orange Red
		"#DB7093", // Pale Violet Red
		"#DC143C", // Crimson
		"#1E90FF", // Dodger Blue
		"#40E0D0", // Turquoise
		"#FFD700", // Gold
	];

	return (
		<Container maxWidth='lg' sx={{ py: 6 }}>
			<Typography variant='h4' sx={{ mb: 4, fontWeight: "medium" }}>
				Profile Settings
			</Typography>

			{/* Color Settings */}
			<Paper
				elevation={0}
				sx={{
					mb: 4,
					borderRadius: 3,
					border: "1px solid",
					borderColor: "divider",
				}}
			>
				<Box sx={{ p: 4 }}>
					<Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 3 }}>
						<Typography variant='h6' sx={{ fontWeight: "medium" }}>
							Profile Colors
						</Typography>
						<Tooltip title='Reset to default colors and angle'>
							<IconButton onClick={handleReset} size='small'>
								<UndoIcon />
							</IconButton>
						</Tooltip>
					</Stack>

					<Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
						Choose colors for your profile banner and adjust its direction. These will be visible to others
						when they visit your profile.
					</Typography>

					<BannerPreview />

					<Stack direction='row' spacing={4} justifyContent={"space-between"} alignItems='center' sx={{ mb: 3 }}>
						{/* Primary Color */}
						<Box>
							<Typography variant='subtitle2' sx={{ mb: 2, fontWeight: "medium" }}>
								Primary Color
							</Typography>
							<ColorPicker
								value={colors.color1}
								onChange={(newColor) => setColors((prev) => ({ ...prev, color1: newColor }))}
								popularColors={popularColors}
								colorBoxSx={{ width: 180, height: 30 }}
							/>
						</Box>

						<Box display='flex' flexDirection='column' alignItems='center'>
							<DirectionPicker value={angle} onChange={setAngle} size={100} />
							<Typography variant='body2' sx={{ mt: 1 }}>
								Angle: <strong>{Math.round(angle)}°</strong>
							</Typography>
						</Box>

						{/* Secondary Color */}
						<Box>
							<Typography variant='subtitle2' sx={{ mb: 2, fontWeight: "medium" }}>
								Secondary Color
							</Typography>
							<ColorPicker
								value={colors.color2}
								onChange={(newColor) => setColors((prev) => ({ ...prev, color2: newColor }))}
								popularColors={popularColors}
								colorBoxSx={{ width: 180, height: 30 }}
							/>
						</Box>
					</Stack>
				</Box>
			</Paper>

			{/* Visibility Settings */}
			<Paper
				elevation={0}
				sx={{
					mb: 4,
					borderRadius: 3,
					border: "1px solid",
					borderColor: "divider",
				}}
			>
				<Box sx={{ p: 4 }}>
					<Typography variant='h6' sx={{ mb: 3, fontWeight: "medium" }}>
						Profile Visibility
					</Typography>

					<Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
						Control who can view your profile information. You can change this setting at any time.
					</Typography>

					<FormControl component='fieldset'>
						<RadioGroup value={visibility} onChange={handleVisibilityChange}>
							<FormControlLabel
								value='all'
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
								value='friends'
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
								value='private'
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
				</Box>
			</Paper>

			{/* Save Button */}
			<Stack direction='row' justifyContent='flex-end' spacing={2}>
				<Button
					variant='contained'
					color='primary'
					onClick={handleSave}
					size='large'
					sx={{
						px: 4,
						borderRadius: 2,
						textTransform: "none",
						fontWeight: "medium",
					}}
				>
					Save Changes
				</Button>
			</Stack>
		</Container>
	);
}

export default RouteComponent;
