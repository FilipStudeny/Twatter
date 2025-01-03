// SinglePost.tsx
import ReportModal from "@Components/report/ReportModal";
import FlagIcon from "@mui/icons-material/Flag";
import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";

import { CommentDetail, PostDetail, UserDetail } from "../../../../shared";

export const ReportButton: React.FC<{ reportTarget: PostDetail | CommentDetail | UserDetail }> = ({ reportTarget }) => {
	const [isReportModalOpen, setIsReportModalOpen] = useState(false);

	const handleReportOpen = () => {
		setIsReportModalOpen(true);
	};

	const handleReportClose = () => {
		setIsReportModalOpen(false);
	};

	return (
		<>
			<Box component='span'>
				<IconButton aria-label='report post' onClick={handleReportOpen}>
					<FlagIcon color='error' />
				</IconButton>
			</Box>
			<ReportModal open={isReportModalOpen} onClose={handleReportClose} reportTarget={reportTarget} />
		</>
	);
};
