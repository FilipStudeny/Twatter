// PostDetailPage.tsx

import CommentsSection from "@Components/post/comments/CommenSection";
import { GET_ERROR_LIST } from "@Utils/getResponseError";
import { reactionChipColors, reactionIcons } from "@Utils/reactions";
import {
	Category as CategoryIcon,
	Group as GroupIcon,
	Report as ReportIcon,
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
	CardActions,
	Tooltip,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useState } from "react";

import { useGetPostsListQuery } from "../../../../shared";

export const Route = createFileRoute("/post/$id")({ component: RouteComponent });

function RouteComponent() {
	const { id } = Route.useParams();
	const { data, isLoading, isError, error } = useGetPostsListQuery({ postId: id });
	const [openReportDialog, setOpenReportDialog] = useState(false);

	const handleReportClick = () => {
		setOpenReportDialog(true);
	};

	const handleReportClose = () => {
		setOpenReportDialog(false);
	};

	const handleReportConfirm = () => {
		console.log("Post reported:", id);
		setOpenReportDialog(false);
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

	const post = data?.getPosts?.items?.[0];
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
					<Typography variant='body2' sx={{ mb: 2, whiteSpace: "pre-line", lineHeight: 1.6 }}>
						{post.content}
					</Typography>
				</CardContent>

				<CardActions
					sx={{
						justifyContent: "space-between",
						paddingX: 2,
						paddingY: 1,
						borderTop: "1px solid #e0e0e0",
					}}
				>
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

					{post.reactions && (
						<Stack direction='row' spacing={0.5}>
							{Object.entries(post.reactions).map(([reactionType, count]) => (
								<Chip
									key={reactionType}
									icon={reactionIcons[reactionType]}
									label={count}
									size='small'
									variant='outlined'
									color={reactionChipColors[reactionType] ?? "default"}
									sx={{
										textTransform: "capitalize",
										cursor: "pointer",
										transition: "background-color 0.3s",
										"&:hover": {
											backgroundColor: (theme) => theme.palette.action.hover,
										},
									}}
								/>
							))}
						</Stack>
					)}
				</CardActions>
			</Card>

			<CommentsSection postId={id} />

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
