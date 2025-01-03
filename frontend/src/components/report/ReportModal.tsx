import { GET_ERROR_LIST } from "@Utils/getResponseError";
import {
	Modal,
	Box,
	Typography,
	TextField,
	Select,
	MenuItem,
	Button,
	FormControl,
	InputLabel,
	CircularProgress,
	Snackbar,
	Alert,
} from "@mui/material";
import React, { useState } from "react";

import {
	CommentDetail,
	PostDetail,
	ReportDto,
	ReportType,
	useCreateReportMutation,
	UserDetail,
} from "../../../../shared";

interface ReportModalProps {
	open: boolean,
	onClose: ()=> void,
	reportTarget: CommentDetail | PostDetail | UserDetail,
}

const ReportModal: React.FC<ReportModalProps> = ({ open, onClose, reportTarget }) => {
	const { mutateAsync: createReport, isPending, isError, error } = useCreateReportMutation();

	const [reportType, setReportType] = useState<ReportType>();
	const [message, setMessage] = useState<string>("");

	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState<string>("");
	const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	const handleSubmit = async () => {
		if (!reportType || !message) {
			setSnackbarMessage("Please fill in all required fields.");
			setSnackbarSeverity("error");
			setSnackbarOpen(true);

			return;
		}

		const reportPayload: ReportDto = {
			reportType,
			message,
		};

		if (reportTarget.__typename === "CommentDetail") {
			reportPayload.reportedCommentId = reportTarget.id;
		} else if (reportTarget.__typename === "PostDetail") {
			reportPayload.reportedPostId = reportTarget.id;
		} else if (reportTarget.__typename === "UserDetail") {
			reportPayload.reportedUserId = reportTarget.id;
		}

		try {
			await createReport({ input: reportPayload });
			setSnackbarMessage("Report submitted successfully!");
			setSnackbarSeverity("success");
			setSnackbarOpen(true);
			onClose();
		} catch (err) {
			setSnackbarMessage("Failed to submit the report.");
			setSnackbarSeverity("error");
			setSnackbarOpen(true);
			console.error("Failed to submit report:", err);
		}
	};

	const targetTitle =
	reportTarget.__typename === "CommentDetail"
		? "comment"
		: reportTarget.__typename === "PostDetail"
			? "post"
			: reportTarget.__typename === "UserDetail"
				? reportTarget.username
				: "Unknown";

	return (
		<>
			<Modal open={open} onClose={onClose}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 450,
						bgcolor: "background.paper",
						boxShadow: 24,
						p: 4,
						borderRadius: 2,
					}}
				>
					<Typography variant='h5' sx={{ fontWeight: 600, mb: 2 }}>
						Report {targetTitle}
					</Typography>
					<Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
						Help us understand the issue by providing detailed information.
					</Typography>

					{isError && (
						<Box sx={{ mb: 2 }}>
							{GET_ERROR_LIST(error).map((errMsg: string, index: number) => (
								<Alert key={index} severity='error' sx={{ mb: 1 }}>
									{errMsg}
								</Alert>
							))}
						</Box>
					)}

					<FormControl fullWidth margin='normal'>
						<InputLabel id='report-type-label'>Select a Reason</InputLabel>
						<Select
							labelId='report-type-label'
							value={reportType}
							onChange={(e) => setReportType(e.target.value as ReportType)}
							label='Select a Reason'
							sx={{
								bgcolor: "background.default",
								borderRadius: 1,
								"&:hover": {
									bgcolor: "action.hover",
								},
							}}
						>
							{Object.values(ReportType).map((type) => (
								<MenuItem key={type} value={type}>
									{type.replace(/_/g, " ")}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<TextField
						fullWidth
						margin='normal'
						label='Describe the Issue'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						multiline
						rows={4}
						variant='outlined'
						sx={{
							bgcolor: "background.default",
							borderRadius: 1,
						}}
					/>

					<Box display='flex' justifyContent='space-between' gap={2} mt={3}>
						<Button
							variant='outlined'
							onClick={onClose}
							disabled={isPending}
							sx={{ textTransform: "capitalize" }}
						>
							Cancel
						</Button>
						<Button
							variant='contained'
							onClick={handleSubmit}
							disabled={isPending || !reportType || !message}
							sx={{ textTransform: "capitalize" }}
							startIcon={isPending && <CircularProgress size={20} />}
						>
							Submit
						</Button>
					</Box>
				</Box>
			</Modal>

			<Snackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={handleSnackbarClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</>
	);
};

export default ReportModal;
