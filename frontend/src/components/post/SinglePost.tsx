import { RouterLink } from "@Components/navigation/routerLink";
import { ReactionsRow } from "@Components/reactions/ReactionsRow";
import { ReportButton } from "@Components/report/ReportButton";
import {
	Category as CategoryIcon,
	Comment as CommentIcon,
	Group as GroupIcon,
	ZoomIn as ZoomInIcon,
} from "@mui/icons-material";
import {
	Avatar,
	Box,
	Card,
	CardContent,
	CardHeader,
	Chip,
	Dialog,
	IconButton,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

import CommentsModal from "./comments/CommentsModal";
import { PostDetail, ReactionTargetType } from "../../../../shared";

interface SinglePostProps {
	post: PostDetail,
	canOpenComments?: boolean,
}

export function SinglePost({ post, canOpenComments = false }: SinglePostProps) {
	const theme = useTheme();
	const [isCommentsOpen, setIsCommentsOpen] = useState(false);
	const [isImageOpen, setIsImageOpen] = useState(false);

	const avatarLetter = post.creator.username?.charAt(0).toUpperCase() ?? "?";

	return (
		<>
			<Card
				elevation={2}
				sx={{
					borderRadius: 2,
					transition: theme.transitions.create(["box-shadow"]),
					"&:hover": {
						boxShadow: theme.shadows[4],
					},
				}}
			>
				<CardHeader
					avatar={<Avatar src={post.creator.profilePictureUrl || undefined}>{avatarLetter}</Avatar>}
					action={<ReportButton reportTarget={post} />}
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
					sx={{ pb: 1 }}
				/>

				<CardContent>
					{/* Content section remains the same */}
					{post.content && (
						<RouterLink to={`/post/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
							<Typography
								variant='body2'
								sx={{
									mb: 2,
									whiteSpace: "pre-line",
									"&:hover": {
										color: theme.palette.primary.main,
									},
								}}
							>
								{post.content}
							</Typography>
						</RouterLink>
					)}

					{/* Image section remains the same */}
					{post.postPicture && (
						<Box sx={{ position: "relative", mb: 2 }}>
							<Box
								component='img'
								src={post.postPicture}
								alt={`Post by ${post.creator.username}`}
								sx={{
									width: "100%",
									borderRadius: 2,
									aspectRatio: "16/9",
									objectFit: "cover",
									cursor: "pointer",
									transition: theme.transitions.create(["transform", "filter"]),
									"&:hover": {
										transform: "scale(1.01)",
										filter: "brightness(0.95)",
									},
								}}
								onClick={() => setIsImageOpen(true)}
							/>
							<IconButton
								size='small'
								sx={{
									position: "absolute",
									right: 8,
									bottom: 8,
									bgcolor: "rgba(0, 0, 0, 0.5)",
									color: "white",
									"&:hover": {
										bgcolor: "rgba(0, 0, 0, 0.7)",
									},
								}}
								onClick={() => setIsImageOpen(true)}
							>
								<ZoomInIcon fontSize='small' />
							</IconButton>
						</Box>
					)}

					{/* Use the ReactionRow component */}
					{post.reactions && (
						<ReactionsRow
							reactions={post.reactions}
							myReaction={post.myReaction ?? undefined}
							targetId={post.id}
							reactionTarget={ReactionTargetType.Post}
						/>
					)}

					{/* Bottom chips section */}
					<Stack
						direction='row'
						spacing={2}
						sx={{
							flexWrap: "wrap",
							gap: 2,
						}}
					>
						<Chip
							icon={<CategoryIcon />}
							label={post.interest?.name ?? "—"}
							size='small'
							variant='outlined'
							color='default'
							sx={{
								height: "28px",
								borderRadius: 2,
								transition: "all 0.2s ease-in-out",
								"&:hover": {
									transform: "translateY(-1px)",
									boxShadow: (theme) => `0 2px 8px ${theme.palette.action.hover}`,
									backgroundColor: "action.hover",
								},
							}}
							clickable
						/>

						{post.group && (
							<Chip
								icon={<GroupIcon />}
								label={post.group.name}
								size='small'
								variant='outlined'
								color='default'
								sx={{
									height: "28px",
									borderRadius: 2,
									transition: "all 0.2s ease-in-out",
									"&:hover": {
										transform: "translateY(-1px)",
										boxShadow: (theme) => `0 2px 8px ${theme.palette.action.hover}`,
										backgroundColor: "action.hover",
									},
								}}
							/>
						)}

						{canOpenComments && (
							<Chip
								icon={<CommentIcon />}
								label={`Comments: ${post.commentsCount ?? 0}`}
								size='small'
								variant='outlined'
								color='primary'
								clickable
								onClick={() => setIsCommentsOpen(true)}
								sx={{
									height: "28px",
									borderRadius: 2,
									transition: "all 0.2s ease-in-out",
									"&:hover": {
										transform: "translateY(-1px)",
										boxShadow: (theme) => `0 2px 8px ${theme.palette.action.hover}`,
										backgroundColor: "action.hover",
									},
								}}
							/>
						)}
					</Stack>
				</CardContent>
			</Card>

			<CommentsModal open={isCommentsOpen} onClose={() => setIsCommentsOpen(false)} postId={post.id} />

			<Dialog
				open={isImageOpen}
				onClose={() => setIsImageOpen(false)}
				maxWidth='lg'
				PaperProps={{
					sx: {
						bgcolor: "transparent",
						boxShadow: "none",
						maxHeight: "90vh",
						maxWidth: "90vw",
					},
				}}
			>
				<Box
					component='img'
					src={post.postPicture ?? ""}
					alt={`Post by ${post.creator.username}`}
					sx={{
						width: "100%",
						height: "100%",
						objectFit: "contain",
					}}
				/>
			</Dialog>
		</>
	);
}

export default SinglePost;
