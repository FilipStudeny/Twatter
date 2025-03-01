import { ReactionsRow } from "@Components/reactions/ReactionsRow";
import { ReportButton } from "@Components/report/ReportButton";
import { Box, Stack, Avatar, Typography, Paper } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

import { CommentDetail, ReactionTargetType } from "../../../../../shared";

interface CommentProps {
	comment: CommentDetail,
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
	const avatarFallback = comment.creator.username?.charAt(0).toUpperCase() ?? "?";

	return (
		<Paper
			variant='outlined'
			sx={{
				p: 2.5,
				borderRadius: 4,
				transition: "all 0.2s ease-in-out",
				backgroundColor: "background.paper",
				borderColor: "divider",
				"&:hover": {
					boxShadow: (theme) => `0 4px 20px ${theme.palette.divider}`,
					transform: "translateY(-2px)",
				},
			}}
		>
			<Stack direction='row' spacing={2.5} alignItems='flex-start'>
				<Avatar
					src={comment.creator.profilePictureUrl || undefined}
					sx={{
						width: 48,
						height: 48,
						fontSize: "1.2rem",
						fontWeight: "bold",
					}}
				>
					{avatarFallback}
				</Avatar>
				<Box sx={{ flexGrow: 1 }}>
					<Stack
						direction='row'
						spacing={1}
						alignItems='center'
						justifyContent='space-between'
						sx={{ mb: 1.5 }}
					>
						<Stack direction='row' spacing={2} alignItems='center'>
							<Typography
								variant='subtitle1'
								sx={{
									fontWeight: 600,
									fontSize: "0.95rem",
									letterSpacing: "-0.02em",
									color: "text.primary",
								}}
							>
								{comment.creator.username}
							</Typography>
							<Typography
								variant='caption'
								sx={{
									color: "text.secondary",
									fontSize: "0.8rem",
								}}
							>
								{dayjs(comment.createdAt).format("MMM D, YYYY h:mm A")}
							</Typography>
						</Stack>
						<ReportButton reportTarget={comment} />
					</Stack>
					<Typography
						variant='body2'
						sx={{
							whiteSpace: "pre-line",
							mb: 2,
							lineHeight: 1.6,
							color: "text.primary",
							fontSize: "0.925rem",
						}}
					>
						{comment.content}
					</Typography>
					{comment.reactions && (
						<ReactionsRow
							reactions={comment.reactions}
							myReaction={comment.myReaction ?? undefined}
							targetId={comment.id}
							reactionTarget={ReactionTargetType.Comment}
						/>
					)}
				</Box>
			</Stack>
		</Paper>
	);
};

export default Comment;
