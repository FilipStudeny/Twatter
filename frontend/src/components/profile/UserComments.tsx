// UserComments.tsx

import Comment from "@Components/post/comments/Comment";
import { GET_ERROR_LIST } from "@Utils/getResponseError";
import { Box, Button, CircularProgress, Alert, Stack } from "@mui/material";
import React from "react";

import { useInfiniteScroll } from "hooks/infiniteScroll";

import { CommentDetail, useInfiniteGetCommentsByCreatorIdQuery } from "../../../../shared";

interface UserCommentsProps {
	userId: string,
}

const UserComments: React.FC<UserCommentsProps> = ({ userId }) => {
	const {
		data: commentPages,
		isLoading: isLoadingComments,
		isError: commentsFetchFailed,
		error: commentsError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteGetCommentsByCreatorIdQuery(
		{ page: 0, limit: 0, creatorId: userId },
		{
			initialPageParam: { page: 1, limit: 5, creatorId: userId },

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

	const allComments: CommentDetail[] =
		commentPages?.pages?.flatMap((page) => page?.getCommentsList?.items ?? []) ?? [];

	return (
		<Box sx={{ mt: 3 }}>
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

			{!isLoadingComments && !commentsFetchFailed && allComments.length === 0 && (
				<Alert severity='info' sx={{ mb: 2 }}>
					No comments available.
				</Alert>
			)}

			<Stack spacing={2}>
				{allComments.map((comment) => (
					<Comment key={comment.id} comment={comment} onReportClick={handleReportCommentClick} />
				))}
			</Stack>

			{hasNextPage && (
				<>
					<Box mt={2} textAlign='center'>
						<Button
							variant='outlined'
							onClick={() => fetchNextPage()}
							disabled={isFetchingNextPage}
							aria-label='Load more comments'
						>
							{isFetchingNextPage ? "Loading..." : "Load More"}
						</Button>
					</Box>

					<Box ref={sentinelRef} height='1px' />
				</>
			)}

			{isFetchingNextPage && (
				<Box display='flex' justifyContent='center' mt={2}>
					<CircularProgress />
				</Box>
			)}
		</Box>
	);
};

export default UserComments;
