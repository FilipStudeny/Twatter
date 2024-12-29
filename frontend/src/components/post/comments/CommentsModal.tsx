// CommentsModal.tsx

import CloseIcon from "@mui/icons-material/Close";
import {
	Dialog,
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
	IconButton,
	DialogContentText,
	useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";

import Comment from "./Comment";
import { useGetCommentsByPostIdQuery } from "../../../../../shared";
// import { reportComment } from "../../../../../shared"; // Uncomment and adjust the path

// 1) Import your new child component

interface CommentsModalProps {
	open: boolean,
	onClose: ()=> void,
	postId: string,
}

const CommentsModal: React.FC<CommentsModalProps> = ({ open, onClose, postId }) => {
	const theme = useTheme();
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
				setFeedback({
					open: true,
					message: "Failed to report the comment. Please try again.",
					severity: "error",
				});
			} finally {
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
				// Backdrop blur (kept from your previous design)
				BackdropProps={{
					sx: {
						backdropFilter: "blur(3px)",
					},
				}}
				PaperProps={{
					sx: {
						borderRadius: 3,
						boxShadow: 24,
						backgroundColor: theme.palette.background.paper,
						overflow: "hidden",
					},
				}}
			>
				{/* Title / Header with subtle gradient */}
				<Box
					sx={{
						background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
						color: "#fff",
						p: 2,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography variant='h6' component='div' id='comments-dialog-title' sx={{ fontWeight: 700 }}>
						Comments
					</Typography>
					<IconButton
						aria-label='close'
						onClick={onClose}
						sx={{
							color: "#fff",
							"&:hover": {
								backgroundColor: "rgba(255,255,255,0.2)",
							},
						}}
					>
						<CloseIcon />
					</IconButton>
				</Box>

				{/* Body Content */}
				<DialogContent dividers sx={{ p: 2 }}>
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
							{data?.getCommentsList?.items?.map((comment) => (
								// 2) Use the new <CommentItem> here:
								<Comment key={comment.id} comment={{ creatorId: comment.creator.id, ...comment }} onReportClick={handleReportClick} />
							))}
						</Stack>
					)}
				</DialogContent>

				{/* Actions (Pagination + Close) */}
				<DialogActions
					sx={{
						justifyContent: "space-between",
						px: 3,
						py: 2,
						flexWrap: "wrap",
						gap: 1,
						borderTop: `1px solid ${theme.palette.divider}`,
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
				PaperProps={{
					sx: {
						borderRadius: 3,
						boxShadow: 24,
					},
				}}
				BackdropProps={{
					sx: {
						backdropFilter: "blur(3px)",
					},
				}}
			>
				<DialogContent sx={{ pt: 3 }}>
					<Typography variant='h6' id='report-confirmation-dialog-title' gutterBottom>
						Report Comment
					</Typography>
					<DialogContentText id='report-confirmation-dialog-description'>
						{`Are you sure you want to report the comment by "${reportingComment?.username}"?`}
					</DialogContentText>
				</DialogContent>
				<DialogActions sx={{ gap: 1, px: 3, py: 2 }}>
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
