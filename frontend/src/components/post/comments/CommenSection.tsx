import { GET_ERROR_LIST } from "@Utils/getResponseError";
import { Box, Button, CircularProgress, Typography, Alert, Stack, Paper } from "@mui/material";
import React from "react";

import { useInfiniteScroll } from "hooks/infiniteScroll";

import Comment from "./Comment";
import CreateCommentForm from "./CreateCommentForm";
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

	const handleCreateComment = async (markdownContent: string) => {
		console.log("Markdown content:", markdownContent);
	};

	return (
		<Box sx={{ mt: 3 }}>
			<CreateCommentForm onSubmit={handleCreateComment} />

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

			<Stack spacing={2}>
				{commentPages?.pages.map((page, pageIndex) => (
					<React.Fragment key={pageIndex}>
						{page?.getCommentsList?.items?.map((comment) => (
							<Paper key={comment.id} sx={{ p: 2 }} elevation={1}>
								<Comment comment={comment} />
							</Paper>
						))}
					</React.Fragment>
				))}
			</Stack>

			{!isLoadingComments &&
				!commentsFetchFailed &&
				commentPages?.pages?.[0]?.getCommentsList?.items?.length === 0 && (
				<Typography variant='body2' sx={{ mt: 2 }}>
					No comments yet.
				</Typography>
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
