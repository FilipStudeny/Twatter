// CommentsModal.tsx
import { reactionChipColors, reactionIcons } from "@Utils/reactions";
import CloseIcon from "@mui/icons-material/Close";
import ReportIcon from "@mui/icons-material/Report"; // Import ReportIcon
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Pagination,
	CircularProgress,
	Alert,
	Snackbar,
	Typography,
	Box,
	Stack,
	Avatar,
	Divider,
	IconButton,
	Chip,
	DialogContentText,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";

import { useGetCommentsByPostIdQuery } from "../../../../../shared";
// Import your report API function
// import { reportComment } from "../../../../../shared"; // Uncomment and adjust the path

interface CommentsModalProps {
	open: boolean,
	onClose: ()=> void,
	postId: string,
}

const CommentsModal: React.FC<CommentsModalProps> = ({ open, onClose, postId }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const commentsLimit = 5; // Number of comments per page

	// State to manage the comment being reported
	const [reportingComment, setReportingComment] = useState<{
		id: string,
		username: string,
	} | null>(null);

	// State for feedback messages using Snackbar
	const [feedback, setFeedback] = useState<{
		open: boolean,
		message: string,
		severity: "success" | "error",
	}>({ open: false, message: "", severity: "success" });

	// Conditionally fetch comments only when the modal is open
	const { data, isLoading, isError, error } = useGetCommentsByPostIdQuery(
		{
			limit: commentsLimit,
			page: currentPage,
			postId: postId,
		},
		{
			enabled: open, // Enable the query only when modal is open
		},
	);

	// Reset to first page when modal opens or postId changes
	useEffect(() => {
		if (open) {
			setCurrentPage(1);
		}
	}, [open, postId]);

	// Calculate total pages based on total comments and limit
	const totalComments = data?.getCommentsList?.total ?? 0;
	const totalPages = Math.ceil(totalComments / commentsLimit);

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
	};

	// Handler to open the report confirmation dialog
	const handleReportClick = (commentId: string, username: string) => {
		setReportingComment({ id: commentId, username });
	};

	// Handler to close the report confirmation dialog
	const handleReportClose = () => {
		setReportingComment(null);
	};

	// Handler to confirm reporting a comment
	const handleReportConfirm = async () => {
		if (reportingComment) {
			try {
				// TODO: Replace with your API call to report the comment
				// Example:
				// await reportComment(reportingComment.id);
				console.log(`Reporting comment ID: ${reportingComment.id}`);

				// Simulate API call delay
				await new Promise((resolve) => setTimeout(resolve, 1000));

				// After successful report
				setFeedback({
					open: true,
					message: `Comment by ${reportingComment.username} has been reported.`,
					severity: "success",
				});
			} catch {
				// Handle error during reporting
				setFeedback({
					open: true,
					message: "Failed to report the comment. Please try again.",
					severity: "error",
				});
			} finally {
				// Close the confirmation dialog
				setReportingComment(null);
			}
		}
	};

	// Handler to close the feedback Snackbar
	const handleFeedbackClose = () => {
		setFeedback({ ...feedback, open: false });
	};

	return (
		<>
			<Dialog
				open={open}
				onClose={onClose}
				fullWidth
				maxWidth='sm'
				aria-labelledby='comments-dialog-title'
				PaperProps={{
					sx: {
						borderRadius: 2,
						boxShadow: 24,
						padding: 1,
						backgroundColor: (theme) => theme.palette.background.paper,
					},
				}}
			>
				<DialogTitle
					id='comments-dialog-title'
					sx={{
						m: 0,
						p: 2,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						borderBottom: "1px solid",
						borderColor: "divider",
					}}
				>
					<Typography variant='h6' component='div'>
						Comments
					</Typography>
					<IconButton
						aria-label='close'
						onClick={onClose}
						sx={{
							color: (theme) => theme.palette.grey[500],
						}}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers sx={{ padding: 2 }}>
					{isLoading ? (
						<Box display='flex' justifyContent='center' alignItems='center' height='200px'>
							<CircularProgress />
						</Box>
					) : isError ? (
						<Alert severity='error'>
							{Array.isArray(error)
								? error.map((err, idx) => <div key={idx}>{err}</div>)
								: "Failed to load comments."}
						</Alert>
					) : totalComments === 0 ? (
						<Typography variant='body1'>No comments available.</Typography>
					) : (
						<Stack spacing={2}>
							{data?.getCommentsList?.items?.map((comment, index: number) => (
								<React.Fragment key={comment.id}>
									<Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
										<Avatar
											src={comment.creator.firstName || undefined}
											sx={{
												width: 40,
												height: 40,
												border: "2px solid",
												borderColor: "primary.main",
												boxShadow: 1,
											}}
										>
											{(!comment.creator.firstName &&
												comment?.creator?.username?.charAt(0).toUpperCase()) ||
												"?"}
										</Avatar>
										<Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
											{/* Top Row: Username and Report Button */}
											<Box
												sx={{
													display: "flex",
													justifyContent: "space-between",
													alignItems: "center",
												}}
											>
												<Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
													{comment.creator.username}
												</Typography>
												{/* Report Button */}
												<IconButton
													aria-label='report comment'
													size='small'
													onClick={() =>
														handleReportClick(
															comment.id,
															comment.creator.username || comment.creator.firstName || "",
														)
													}
													sx={{
														color: (theme) => theme.palette.error.main,
														"&:hover": {
															backgroundColor: (theme) => theme.palette.error.light,
														},
													}}
												>
													<ReportIcon fontSize='small' />
												</IconButton>
											</Box>
											{/* Comment Content */}
											<Typography variant='body2' sx={{ whiteSpace: "pre-line", mt: 0.5 }}>
												{comment.content}
											</Typography>
											{/* Bottom Row: Timestamp and Reactions */}
											<Box
												sx={{
													display: "flex",
													justifyContent: "space-between",
													alignItems: "center",
													mt: 0.5,
												}}
											>
												<Typography variant='caption' color='text.secondary'>
													{dayjs(comment.createdAt).format("MMM D, YYYY h:mm A")}
												</Typography>
												{/* Display Reactions on the Right */}
												{comment.reactions && (
													<Stack direction='row' spacing={1} sx={{ flexWrap: "wrap" }}>
														{Object.entries(comment.reactions).map(
															([reactionType, count]) =>
																(count as number) > 0 ? (
																	<Chip
																		key={reactionType}
																		icon={reactionIcons[reactionType]}
																		label={count}
																		size='small'
																		variant='filled'
																		color={
																			reactionChipColors[reactionType] ??
																			"default"
																		}
																		sx={{
																			textTransform: "capitalize",
																			fontWeight: 500,
																		}}
																	/>
																) : null,
														)}
													</Stack>
												)}
											</Box>
										</Box>
									</Box>
									{data?.getCommentsList?.items &&
										index !== data?.getCommentsList?.items?.length - 1 && (
										<Divider sx={{ my: 2, borderColor: "divider" }} />
									)}
								</React.Fragment>
							))}
						</Stack>
					)}
				</DialogContent>
				<DialogActions
					sx={{
						justifyContent: "space-between",
						paddingX: 3,
						paddingY: 2,
						flexWrap: "wrap",
						gap: 1,
						borderTop: "1px solid",
						borderColor: "divider",
					}}
				>
					{totalPages > 1 && (
						<Pagination
							count={totalPages}
							page={currentPage}
							onChange={handlePageChange}
							color='primary'
							sx={{ mt: 1 }}
						/>
					)}
					<Button onClick={onClose} color='primary' variant='contained' sx={{ textTransform: "none" }}>
						Close
					</Button>
				</DialogActions>
			</Dialog>

			{/* Report Confirmation Dialog */}
			<Dialog
				open={Boolean(reportingComment)}
				onClose={handleReportClose}
				aria-labelledby='report-confirmation-dialog-title'
				aria-describedby='report-confirmation-dialog-description'
			>
				<DialogTitle id='report-confirmation-dialog-title'>Report Comment</DialogTitle>
				<DialogContent>
					<DialogContentText id='report-confirmation-dialog-description'>
						{`Are you sure you want to report the comment by "${reportingComment?.username}"?`}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleReportClose} color='primary' sx={{ textTransform: "none" }}>
						Cancel
					</Button>
					<Button
						onClick={handleReportConfirm}
						color='error'
						variant='contained'
						sx={{ textTransform: "none" }}
					>
						Report
					</Button>
				</DialogActions>
			</Dialog>

			{/* Feedback Snackbar */}
			<Snackbar
				open={feedback.open}
				autoHideDuration={6000}
				onClose={handleFeedbackClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			>
				<Alert onClose={handleFeedbackClose} severity={feedback.severity} sx={{ width: "100%" }}>
					{feedback.message}
				</Alert>
			</Snackbar>
		</>
	);
};

export default CommentsModal;
