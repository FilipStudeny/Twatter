import { reactionChipColors, reactionIcons } from "@Utils/reactions";
import ReportIcon from "@mui/icons-material/Report";
import { Box, Stack, Avatar, IconButton, Chip, Typography, useTheme, Paper } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

import { CommentDetail } from "../../../../../shared";

interface CommentProps {
	comment: CommentDetail,
	onReportClick: (commentId: string, username: string)=> void,
}

const Comment: React.FC<CommentProps> = ({ comment, onReportClick }) => {
	const theme = useTheme();

	return (
		<Paper
			variant='outlined'
			sx={{
				p: 2,
				borderRadius: 3,
				transition: "box-shadow 0.2s",
				boxShadow: "none",
				"&:hover": {
					boxShadow: 3,
				},
			}}
		>
			<Stack direction='row' spacing={2} alignItems='flex-start'>
				<Avatar
					src={comment.creator.firstName || undefined}
					sx={{
						width: 48,
						height: 48,
						boxShadow: 1,
					}}
				>
					{(!comment.creator.firstName && comment.creator.username?.charAt(0).toUpperCase()) || "?"}
				</Avatar>

				<Box sx={{ flexGrow: 1 }}>
					{/* Row 1: Username + Timestamp + Report */}
					<Stack
						direction='row'
						spacing={1}
						alignItems='center'
						justifyContent='space-between'
						sx={{ mb: 1 }}
					>
						<Stack direction='row' spacing={2} alignItems='center'>
							<Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
								{comment.creator.username}
							</Typography>
							<Typography variant='caption' color='text.secondary'>
								{dayjs(comment.createdAt).format("MMM D, YYYY h:mm A")}
							</Typography>
						</Stack>

						<IconButton
							aria-label='report comment'
							size='small'
							onClick={() =>
								onReportClick(comment.id, comment.creator.username || comment.creator.firstName || "")
							}
							sx={{
								color: theme.palette.error.main,
								"&:hover": {
									backgroundColor: theme.palette.error.light,
									color: "white",
								},
							}}
						>
							<ReportIcon fontSize='small' />
						</IconButton>
					</Stack>

					{/* Row 2: Main comment text */}
					<Typography variant='body2' sx={{ whiteSpace: "pre-line", mb: 1.5 }}>
						{comment.content}
					</Typography>

					{/* Row 3: Reactions */}
					{comment.reactions && (
						<Stack direction='row' spacing={1} sx={{ flexWrap: "wrap" }}>
							{Object.entries(comment.reactions).map(
								([reactionType, count]) =>
									(count as number) > 0 && (
										<Chip
											key={reactionType}
											icon={reactionIcons[reactionType]}
											label={count}
											size='small'
											variant='outlined'
											color={reactionChipColors[reactionType] ?? "default"}
											sx={{
												textTransform: "capitalize",
												fontWeight: 500,
												cursor: "pointer",
												transition: "background-color 0.3s",
												"&:hover": {
													backgroundColor: (theme) => theme.palette.action.hover,
												},
											}}
										/>
									),
							)}
						</Stack>
					)}
				</Box>
			</Stack>
		</Paper>
	);
};

export default Comment;
