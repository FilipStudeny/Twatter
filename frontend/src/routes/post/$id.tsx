// PostDetailPage.tsx
import { GET_ERROR_LIST } from "@Utils/getResponseError";
import {
	Category as CategoryIcon,
	Favorite as FavoriteIcon,
	Group as GroupIcon,
	Mood as MoodIcon,
	SentimentDissatisfied as SentimentDissatisfiedIcon,
	SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon,
	ThumbDown as ThumbDownIcon,
	ThumbUp as ThumbUpIcon,
	Report as ReportIcon, // Import ReportIcon
} from "@mui/icons-material";
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
	CircularProgress,
	Alert,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	CardActions, // Import CardActions for the footer
	Tooltip, // Import Tooltip for hover effects
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import React, { useState } from "react";

import { useGetPostsListQuery } from "../../../../shared";

// Reaction icons and colors
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

// Define the route using @tanstack/react-router
export const Route = createFileRoute("/post/$id")({ component: RouteComponent });

function RouteComponent() {
	// Extract the 'id' parameter from the route
	const { id } = Route.useParams();

	// Fetch post data using the query hook
	const { data, isLoading, isError, error } = useGetPostsListQuery({ postId: id });

	// State for report dialog
	const [openReportDialog, setOpenReportDialog] = useState(false);

	// Handler to open the report dialog
	const handleReportClick = () => {
		setOpenReportDialog(true);
	};

	// Handler to close the report dialog
	const handleReportClose = () => {
		setOpenReportDialog(false);
	};

	// Handler to confirm the report
	const handleReportConfirm = () => {
		// Implement your report logic here (e.g., API call)
		console.log("Post reported:", id);
		setOpenReportDialog(false);
		// Optionally, show a success message or notification
	};

	if (isLoading) {
		return (
			<Box display='flex' justifyContent='center' mt={4}>
				<CircularProgress />
			</Box>
		);
	}

	if (isError) {
		return (
			<Box display='flex' justifyContent='center' mt={4}>
				{GET_ERROR_LIST(error).map((errMsg: string, index: number) => (
					<Alert key={index} severity='error' sx={{ marginTop: "5px" }}>
						{errMsg}
					</Alert>
				))}
			</Box>
		);
	}

	const post = data?.getPosts?.items?.[0] ?? undefined;

	if (!post) {
		return (
			<Box display='flex' justifyContent='center' mt={4}>
				<Alert severity='warning'>Post not found.</Alert>
			</Box>
		);
	}

	const avatarLetter = post.creator.username ? post.creator.username.charAt(0).toUpperCase() : "?";

	return (
		<>
			<Card sx={{ mb: 2, maxWidth: "100%", borderRadius: 2 }} elevation={3}>
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
						<Tooltip title='Report Post'>
							<IconButton aria-label='report post' onClick={handleReportClick} color='error'>
								<ReportIcon />
							</IconButton>
						</Tooltip>
					}
				/>
				<CardContent>
					{/* Post Content */}
					<Typography variant='body2' sx={{ mb: 2, whiteSpace: "pre-line", lineHeight: 1.6 }}>
						{post.content}
					</Typography>
				</CardContent>

				{/* Footer with Metadata and Reactions */}
				<CardActions
					sx={{
						justifyContent: "space-between",
						paddingX: 2,
						paddingY: 1,
						borderTop: "1px solid #e0e0e0",
					}}
				>
					{/* Post Metadata */}
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
							Comments: {post.commentsCount ?? 0}
						</Typography>
					</Box>

					{/* Reactions Chips */}
					{post.reactions && (
						<Stack direction='row' spacing={0.5}>
							{Object.entries(post.reactions).map(([reactionType, count]) => (
								<Tooltip
									key={reactionType}
									title={`${reactionType.charAt(0).toUpperCase() + reactionType.slice(1)}: ${count}`}
								>
									<Chip
										icon={reactionIcons[reactionType]}
										label={count}
										size='small'
										variant='outlined'
										color={reactionChipColors[reactionType] ?? "default"}
										sx={{
											textTransform: "capitalize",
											cursor: "pointer",
											transition: "background-color 0.3s",
											"&:hover": { backgroundColor: (theme) => theme.palette.action.hover },
										}}
										// Uncomment below to make reactions interactive
										// onClick={() => handleReactionClick(reactionType)}
									/>
								</Tooltip>
							))}
						</Stack>
					)}
				</CardActions>
			</Card>

			{/* Report Post Confirmation Dialog */}
			<Dialog
				open={openReportDialog}
				onClose={handleReportClose}
				aria-labelledby='report-dialog-title'
				aria-describedby='report-dialog-description'
			>
				<DialogTitle id='report-dialog-title'>Report Post</DialogTitle>
				<DialogContent>
					<DialogContentText id='report-dialog-description'>
						Are you sure you want to report this post? This action cannot be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleReportClose} color='primary'>
						Cancel
					</Button>
					<Button onClick={handleReportConfirm} color='error' autoFocus>
						Report
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default RouteComponent;
