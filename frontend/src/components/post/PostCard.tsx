// SinglePost.tsx
import { RouterLink } from "@Components/navigation/routerLink";
import CategoryIcon from "@mui/icons-material/Category";
import CommentIcon from "@mui/icons-material/Comment";
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
	Dialog,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useState, MouseEvent } from "react";

import CommentsModal from "./comments/CommentsModal";
import { PostDetail } from "../../../../shared";

const reactionIcons: Record<string, JSX.Element> = {
	like: <ThumbUpIcon fontSize='small' />,
	dislike: <ThumbDownIcon fontSize='small' />,
	sad: <SentimentDissatisfiedIcon fontSize='small' />,
	smile: <MoodIcon fontSize='small' />,
	angry: <SentimentVeryDissatisfiedIcon fontSize='small' />,
	love: <FavoriteIcon fontSize='small' />,
};

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

interface SinglePostProps {
	post: PostDetail,
}

const SinglePost: React.FC<SinglePostProps> = ({ post }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [isCommentsOpen, setIsCommentsOpen] = useState(false);
	const [isImageOpen, setIsImageOpen] = useState(false);

	const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleReactionSelect = (reactionType: string) => {
		handleMenuClose();
		console.log("User selected reaction:", reactionType);
		// TODO: Implement reaction logic (e.g., send to API)
	};

	const handleCommentsOpen = () => {
		setIsCommentsOpen(true);
	};

	const handleCommentsClose = () => {
		setIsCommentsOpen(false);
	};

	// Image modal handlers
	const handleImageClick = () => {
		setIsImageOpen(true);
	};

	const handleImageClose = () => {
		setIsImageOpen(false);
	};

	// Fallback for user’s avatar letter
	const avatarLetter = post.creator.username ? post.creator.username.charAt(0).toUpperCase() : "?";

	return (
		<>
			<Card
				sx={{
					mb: 2,
					maxWidth: "100%",
					borderRadius: 2,
					elevation: 2,
				}}
			>
				<CardHeader
					avatar={<Avatar>{avatarLetter}</Avatar>}
					title={
						<Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
							{post.creator.username}
						</Typography>
					}
					subheader={
						<Typography variant='caption' color='text.secondary'>
							{dayjs(post.createdAt).format("MMM D, YYYY h:mm A")}
						</Typography>
					}
					action={
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
					sx={{ pb: 1, pt: 2 }}
				/>

				<CardContent sx={{ pt: 0 }}>
					{/* Post text content */}
					{post.content && (
						<RouterLink to={`/post/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
							<Typography variant='body2' sx={{ mb: 2, whiteSpace: "pre-line" }}>
								{post.content}
							</Typography>
						</RouterLink>
					)}

					{/* Clickable post picture (if present) */}
					{post.postPicture && (
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								mb: 2,
								cursor: "pointer",
							}}
							onClick={handleImageClick}
						>
							<Box
								component='img'
								src={post.postPicture}
								alt={`Post ${post.id} image`}
								sx={{
									height: 233,
									width: "100%",
									maxHeight: { xs: 233, md: 167 },
									borderRadius: 2,
									objectFit: "cover",
								}}
							/>
						</Box>
					)}

					{/* Reactions (if any) */}
					{post.reactions && (
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
					)}

					{/* Interest, group, and comment count */}
					<Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
						<Typography
							variant='caption'
							color='text.secondary'
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 0.5,
								cursor: "pointer",
							}}
							onClick={handleCommentsOpen}
						>
							<CategoryIcon fontSize='inherit' />
							{post.interest?.name ?? "—"}
						</Typography>

						{post.group && (
							<Typography
								variant='caption'
								color='text.secondary'
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 0.5,
								}}
							>
								<GroupIcon fontSize='inherit' />
								{post.group.name}
							</Typography>
						)}

						<Typography
							variant='caption'
							color='text.secondary'
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 0.5,
								cursor: "pointer",
							}}
							onClick={handleCommentsOpen}
						>
							<CommentIcon fontSize='inherit' />
							Comments: {post.commentsCount ?? 0}
						</Typography>
					</Box>
				</CardContent>
			</Card>

			{/* Comments Modal */}
			<CommentsModal open={isCommentsOpen} onClose={handleCommentsClose} postId={post.id} />

			{/* Image Modal */}
			<Dialog
				open={isImageOpen}
				onClose={handleImageClose}
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
					src={post.postPicture ?? ""}
					alt={`Fullscreen post ${post.id} image`}
					sx={{
						maxWidth: "90vw",
						maxHeight: "90vh",
						objectFit: "contain",
					}}
				/>
			</Dialog>
		</>
	);
};

export default SinglePost;
