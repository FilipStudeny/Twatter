import { CheckCircle, Error, HourglassEmpty, Cancel, Report } from "@mui/icons-material";
import { Card, CardContent, Typography, Stack, Chip } from "@mui/material";
import React from "react";

import { ReportDetail, ReportStatus, ReportType } from "../../../../../shared";

// Helper function to get the icon for report status
const getStatusIcon = (status: ReportStatus) => {
	switch (status) {
		case ReportStatus.Open:
			return <Error color='warning' />;
		case ReportStatus.InProgress:
			return <HourglassEmpty color='info' />;
		case ReportStatus.Resolved:
			return <CheckCircle color='success' />;
		case ReportStatus.Closed:
			return <Cancel color='error' />;
		default:
			return <Error color='disabled' />; // Fallback icon
	}
};

// Helper function to get the icon for report type
const getReportTypeIcon = (type: ReportType) => {
	switch (type) {
		case ReportType.Spam:
			return <Report color='primary' />;
		case ReportType.Abuse:
			return <Report color='error' />;
		case ReportType.InappropriateContent:
			return <Report color='secondary' />;
		case ReportType.Harassment:
			return <Report color='warning' />;
		default:
			return <Report color='disabled' />;
	}
};

interface ReportCardProps {
	report: ReportDetail,
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
	return (
		<Card variant='outlined' sx={{ mb: 2 }}>
			<CardContent>
				<Stack direction='row' justifyContent='space-between' alignItems='center'>
					<Typography variant='h6' gutterBottom>
						{report.reportMessage}
					</Typography>
					<Chip
						icon={report.reportStatus !== undefined ? getStatusIcon(report.reportStatus) : undefined}
						label={report.reportStatus}
						size='small'
					/>
				</Stack>
				<Typography variant='body2' color='textSecondary'>
					Reported User: {report.reportedUser || "N/A"}
				</Typography>
				<Typography variant='body2' color='textSecondary'>
					Reported Post: {report.reportedPost || "N/A"}
				</Typography>
				<Typography variant='body2' color='textSecondary'>
					Reported Comment: {report.reportedComment || "N/A"}
				</Typography>
				<Typography variant='body2' color='textSecondary'>
					Resolution Message: {report.resolutionMessage || "N/A"}
				</Typography>

				<Typography variant='caption' color='textSecondary' display='block' mt={2}>
					Created At: {new Date(report.createdAt).toLocaleString()}
				</Typography>
				<Typography variant='caption' color='textSecondary'>
					Updated At: {new Date(report.updatedAt).toLocaleString()}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default ReportCard;
