// CommentsSection.tsx
import { GET_ERROR_LIST } from "@Utils/getResponseError";
import { Box, Button, CircularProgress, Typography, Alert } from "@mui/material";
import React, { useEffect } from "react";

import { useInfiniteScroll } from "hooks/infiniteScroll";

import Comment from "./Comment";
import { useInfiniteGetCommentsByPostIdQuery } from "../../../../../shared";

interface CommentsSectionProps {
	postId: string,
}

function CommentsSection({ postId }: CommentsSectionProps) {
	const {
		data: commentPages,
		isLoading: isLoadingComments,
		isError: commentsFetchFailed,
		error: commentsError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteGetCommentsByPostIdQuery(
		{
			postId,
			page: 0,
			limit: 0,
		},
		{
			initialPageParam: { page: 1, limit: 5 },
			getNextPageParam: (lastPage) => {
				const currentPage = lastPage?.getCommentsList?.page ?? 1;
				const limit = lastPage?.getCommentsList?.limit ?? 5;
				const total = lastPage?.getCommentsList?.total ?? 0;
				if (currentPage * limit < total) {
					return { page: currentPage + 1, limit };
				}

				return undefined;
			},
		},
	);

	const { sentinelRef } = useInfiniteScroll(Boolean(hasNextPage), isFetchingNextPage, fetchNextPage);

	const handleReportCommentClick = (commentId: string, username: string) => {
		console.log(`Reporting comment [id=${commentId}] by user: ${username}`);
	};

	useEffect(() => {
		console.log(commentPages?.pages);
	}, [commentPages?.pages]);

	return (
		<Box sx={{ mt: 3 }}>
			<Typography variant='h6' gutterBottom>
				Comments
			</Typography>

			{isLoadingComments && (
				<Box display='flex' justifyContent='center' mb={2}>
					<CircularProgress />
				</Box>
			)}

			{commentsFetchFailed && (
				<Alert severity='error' sx={{ mb: 2 }}>
					{GET_ERROR_LIST(commentsError).map((errMsg, idx) => (
						<div key={idx}>{errMsg}</div>
					))}
				</Alert>
			)}

			{commentPages?.pages.map((page, pageIndex) => (
				<React.Fragment key={pageIndex}>
					{page?.getCommentsList?.items?.map((comment) => (
						<Box key={comment.id} sx={{ mb: 2 }}>
							<Comment
								comment={{
									creatorId: comment.creator.id,
									...comment,
								}}
								onReportClick={handleReportCommentClick}
							/>
						</Box>
					))}
				</React.Fragment>
			))}

			{!isLoadingComments &&
				!commentsFetchFailed &&
				commentPages?.pages?.[0]?.getCommentsList?.items?.length === 0 && (
				<Typography variant='body2'>No comments yet.</Typography>
			)}

			{hasNextPage && (
				<Box mt={2} textAlign='center'>
					<Button variant='outlined' onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
						{isFetchingNextPage ? "Loading..." : "Load More"}
					</Button>
				</Box>
			)}

			{hasNextPage && <Box ref={sentinelRef} height='1px' />}
		</Box>
	);
}

export default CommentsSection;
