import { RouterLink } from "@Components/navigation/routerLink";
import BlockIcon from "@mui/icons-material/Block";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import WarningIcon from "@mui/icons-material/Warning";
import {
	Card,
	CardContent,
	Typography,
	Box,
	Chip,
	Divider,
	Stack,
	Avatar,
	useTheme,
	Tooltip,
	Button,
} from "@mui/material";
import React from "react";

import { ReportDetail, ReportStatus, ReportType } from "../../../../shared";

type ReportCardProps = {
	report: ReportDetail,
};

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
	const theme = useTheme();
	const createdDate = new Date(report.createdAt).toLocaleString();
	const updatedDate = new Date(report.updatedAt).toLocaleString();

	const getLeftStripColor = (status: ReportStatus): string => {
		switch (status) {
			case ReportStatus.Resolved:
				return theme.palette.success.main;
			case ReportStatus.InProgress:
				return theme.palette.warning.main;
			case ReportStatus.Open:
				return theme.palette.info.main;
			case ReportStatus.Closed:
				return theme.palette.error.main;
			default:
				return theme.palette.grey[400];
		}
	};

	const getStatusIcon = (status: ReportStatus) => {
		switch (status) {
			case ReportStatus.Resolved:
				return <DoneIcon />;
			case ReportStatus.InProgress:
				return <WarningIcon />;
			case ReportStatus.Open:
			case ReportStatus.Closed:
				return <ErrorIcon />;
			default:
				return undefined;
		}
	};

	const getStatusColor = (status: ReportStatus) => {
		switch (status) {
			case ReportStatus.Resolved:
				return "success";
			case ReportStatus.InProgress:
				return "warning";
			case ReportStatus.Open:
				return "info";
			case ReportStatus.Closed:
				return "error";
			default:
				return "default";
		}
	};

	const getReportTypeIcon = (type: ReportType | null | undefined) => {
		switch (type) {
			case ReportType.Abuse:
				return <BlockIcon fontSize='small' color="error"/>;
			case ReportType.Harassment:
				return <MoodBadIcon fontSize='small' color='error' />;
			case ReportType.Spam:
				return <ReportProblemIcon fontSize='small' color='error' />;
			case ReportType.InappropriateContent:
				return <NotInterestedIcon fontSize='small' color='error' />;
			case ReportType.Other:
			default:
				return <MoreHorizIcon fontSize='small' color='error' />;
		}
	};

	const getReportTypeLabel = (type: ReportType | null | undefined) => {
		if (!type) return "";
		switch (type) {
			case ReportType.Spam:
				return "Spam";
			case ReportType.Abuse:
				return "Abuse";
			case ReportType.InappropriateContent:
				return "Inappropriate Content";
			case ReportType.Harassment:
				return "Harassment";
			case ReportType.Other:
			default:
				return "Other";
		}
	};

	return (
		<Card
			sx={{
				display: "flex",
				mb: 2,
				borderRadius: 2,
				boxShadow: theme.shadows[3],
				border: `1px solid ${theme.palette.divider}`,
				overflow: "hidden",
				transition: "transform 0.3s, box-shadow 0.3s",
				"&:hover": {
					transform: "translateY(-2px)",
					boxShadow: theme.shadows[5],
				},
			}}
		>
			<Box
				sx={{
					width: 8,
					backgroundColor: getLeftStripColor(report.reportStatus),
				}}
			/>

			<Box sx={{ flex: 1 }}>
				<CardContent sx={{ py: 2 }}>
					<Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
						<Stack direction='row' spacing={1} alignItems='center'>
							<Avatar
								sx={{
									bgcolor: theme.palette.primary.main,
									width: 32,
									height: 32,
								}}
							>
								<InfoIcon fontSize='small' />
							</Avatar>
							<Typography variant='h6' fontWeight='bold'>
								Report #{report.id}
							</Typography>
						</Stack>

						{/* Right side: Status Chip + "Open ..." buttons */}
						<Box display='flex' alignItems='center' gap={1}>
							<Tooltip title={`Status: ${report.reportStatus}`}>
								<Chip
									icon={getStatusIcon(report.reportStatus)}
									label={report.reportStatus}
									color={getStatusColor(report.reportStatus)}
									variant='filled'
								/>
							</Tooltip>

							{report.reportedUser && (
								<RouterLink
									to={`/users/${report.reportedUser}`}
									style={{ textDecoration: "none", color: "inherit" }}
								>
									<Button variant='outlined' size='small'>
										Open User
									</Button>
								</RouterLink>
							)}

							{report.reportedComment && (
								<RouterLink
									to={`/comments/${report.reportedComment}`}
									style={{ textDecoration: "none", color: "inherit" }}
								>
									<Button variant='outlined' size='small'>
										Open Comment
									</Button>
								</RouterLink>
							)}

							{report.reportedPost && (
								<RouterLink
									to={`/posts/${report.reportedPost}`}
									style={{ textDecoration: "none", color: "inherit" }}
								>
									<Button variant='outlined' size='small'>
										Open Post
									</Button>
								</RouterLink>
							)}
						</Box>
					</Box>

					<Divider sx={{ mb: 2 }} />

					<Box display='flex' alignItems='center' gap={1} mb={1}>
						{getReportTypeIcon((report).reportType)}
						<Typography variant='body2'>
							<strong>Type:</strong> {getReportTypeLabel(report.reportType)}
						</Typography>
					</Box>

					{report.reporter && (
						<Typography variant='body2' sx={{ mb: 1 }}>
							<strong>Reporter:</strong> {report.reporter.username ?? "Unknown"} (ID: {report.reporter.id}
							)
						</Typography>
					)}

					{report.reportedUser && (
						<Typography variant='body2' sx={{ mb: 1 }}>
							<strong>Reported User ID:</strong> {report.reportedUser}
						</Typography>
					)}
					{report.reportedComment && (
						<Typography variant='body2' sx={{ mb: 1 }}>
							<strong>Reported Comment ID:</strong> {report.reportedComment}
						</Typography>
					)}
					{report.reportedPost && (
						<Typography variant='body2' sx={{ mb: 1 }}>
							<strong>Reported Post ID:</strong> {report.reportedPost}
						</Typography>
					)}

					{report.reportMessage && (
						<Typography variant='body2' sx={{ mb: 2 }}>
							<strong>Report Message:</strong> {report.reportMessage}
						</Typography>
					)}

					{report.resolutionMessage && (
						<Typography variant='body2' sx={{ mb: 2, fontStyle: "italic" }} color='text.secondary'>
							<strong>Resolution:</strong> {report.resolutionMessage}
						</Typography>
					)}

					<Divider sx={{ my: 2 }} />

					<Box display='flex' flexDirection={{ xs: "column", sm: "row" }} gap={2}>
						<Typography variant='caption' color='text.secondary'>
							Created: {createdDate}
						</Typography>
						<Typography variant='caption' color='text.secondary'>
							Updated: {updatedDate}
						</Typography>
					</Box>
				</CardContent>
			</Box>
		</Card>
	);
};

export default ReportCard;
