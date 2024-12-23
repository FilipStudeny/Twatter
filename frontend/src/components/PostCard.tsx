// SinglePost.tsx

import CategoryIcon from "@mui/icons-material/Category";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GroupIcon from "@mui/icons-material/Group";
import MoodIcon from "@mui/icons-material/Mood";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
	Card,
	CardHeader,
	CardContent,
	Typography,
	Stack,
	Chip,
	Avatar,
	IconButton,
	Box,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useState, MouseEvent } from "react";

// Types
interface Creator {
	id: string,
	username: string,
}
interface Reactions {
	like: number,
	dislike: number,
	sad: number,
	smile: number,
	angry: number,
	love: number,
}
interface Interest {
	id: string,
	name: string,
}
interface Group {
	id?: string,
	name?: string,
}
export interface Post {
	id: string,
	content: string,
	creator: Creator,
	reactions: Reactions,
	interest: Interest | null,
	group: Group | null,
	commentsCount: number,
	createdAt: string,
}
interface SinglePostProps {
post: Post,}

// Reaction icons
const reactionIcons: Record<string, React.ReactNode> = {
	like: <ThumbUpIcon fontSize='small' />,
	dislike: <ThumbDownIcon fontSize='small' />,
	sad: <SentimentDissatisfiedIcon fontSize='small' />,
	smile: <MoodIcon fontSize='small' />,
	angry: <SentimentVeryDissatisfiedIcon fontSize='small' />,
	love: <FavoriteIcon fontSize='small' />,
};

// Assign each reaction a MUI Chip color (you can adjust as you like)
const reactionChipColors: Record<
	string,
	"default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
> = {
	like: "success",
	dislike: "error",
	sad: "info",
	smile: "warning",
	angry: "error",
	love: "primary",
};

const SinglePost: React.FC<SinglePostProps> = ({ post }) => {
	// Create a fallback initial for the user avatar
	const avatarLetter = post.creator.username.charAt(0).toUpperCase();

	// State for the "add reaction" menu
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	// Example: when user selects a reaction from the menu
	const handleReactionSelect = (reactionType: string) => {
		handleMenuClose();
		// In a real app, you'd likely call an API or update local state to reflect the new reaction
		console.log("User selected reaction:", reactionType);
	};

	return (
		<Card
			sx={{
				mb: 2,
				width: "100%",
				maxWidth: "100%",
			}}
			elevation={3}
		>
			<CardHeader
				avatar={<Avatar>{avatarLetter}</Avatar>}
				title={
					<Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
						{post.creator.username}
					</Typography>
				}
				subheader={
					<Typography variant='caption' color='text.secondary'>
						{dayjs(post.createdAt).format("MMM D, YYYY h:mm A")}
					</Typography>
				}
				action={
					// "More" / "Add reaction" icon
					<>
						<IconButton aria-label='add reaction' onClick={handleMenuOpen}>
							<MoreVertIcon />
						</IconButton>
						<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
							{Object.entries(reactionIcons).map(([reactionType, icon]) => (
								<MenuItem key={reactionType} onClick={() => handleReactionSelect(reactionType)}>
									<ListItemIcon>{icon}</ListItemIcon>
									<ListItemText primary={reactionType} />
								</MenuItem>
							))}
						</Menu>
					</>
				}
			/>

			<CardContent>
				{/* Post content */}
				<Typography variant='body2' sx={{ mb: 2, whiteSpace: "pre-line" }}>
					{post.content}
				</Typography>

				{/* Reaction chips */}
				<Stack direction='row' spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
					{Object.entries(post.reactions).map(([reactionType, count]) => (
						<Chip
							key={reactionType}
							icon={reactionIcons[reactionType]}
							label={count}
							size='small'
							variant='outlined'
							color={reactionChipColors[reactionType] ?? "default"}
							sx={{ textTransform: "capitalize" }}
						/>
					))}
				</Stack>

				{/* Interest and Group info (optional icons) */}
				<Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
					<Typography
						variant='caption'
						color='text.secondary'
						sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
					>
						<CategoryIcon fontSize='inherit' />
						{post.interest?.name ?? "—"}
					</Typography>

					{post.group && (
						<Typography
							variant='caption'
							color='text.secondary'
							sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
						>
							<GroupIcon fontSize='inherit' />
							{post.group.name}
						</Typography>
					)}

					<Typography variant='caption' color='text.secondary'>
						Comments: {post.commentsCount}
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

export default SinglePost;
