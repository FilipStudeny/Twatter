import SinglePost from "@Components/post/SinglePost";
import Comment from "@Components/post/comments/Comment";
import { GET_ERROR_LIST } from "@Utils/getResponseError";
import { Box, Button, CircularProgress, Alert, Stack } from "@mui/material";
import React from "react";

import { useInfiniteScroll } from "hooks/infiniteScroll";

import { CommentDetail, PostDetail, useInfiniteGetUserReactionsQuery } from "../../../../shared";

interface UserReactionsProps {
	userId: string;
}

const UserReactions: React.FC<UserReactionsProps> = ({ userId }) => {
	const {
		data: reactionsPages,
		isLoading: isLoadingReactions,
		isError: reactionsFetchFailed,
		error: reactionsError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteGetUserReactionsQuery(
		{ page: 0, limit: 0, userId },
		{
			initialPageParam: { page: 1, limit: 2, userId },
			getNextPageParam: (lastPage) => {
				const currentPage = lastPage?.getUserReactions?.page ?? 1;
				const limit = lastPage?.getUserReactions?.limit ?? 5;
				const total = lastPage?.getUserReactions?.total ?? 0;
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

	const allReactions: Array<CommentDetail | PostDetail> =
		reactionsPages?.pages.flatMap((page) => page?.getUserReactions?.items ?? []) ?? [];

	return (
		<Box sx={{ mt: 3 }}>
			{isLoadingReactions && (
				<Box display='flex' justifyContent='center' mb={2}>
					<CircularProgress />
				</Box>
			)}

			{reactionsFetchFailed && (
				<Alert severity='error' sx={{ mb: 2 }}>
					{GET_ERROR_LIST(reactionsError).map((errMsg, idx) => (
						<div key={idx}>{errMsg}</div>
					))}
				</Alert>
			)}

			{!isLoadingReactions && !reactionsFetchFailed && allReactions.length === 0 && (
				<Alert severity='info' sx={{ mb: 2 }}>
					No reactions available.
				</Alert>
			)}

			<Stack spacing={2}>
				{allReactions.map((reaction) => {
					if (reaction.__typename === "CommentDetail") {
						return (
							<Comment key={reaction.id} comment={reaction} onReportClick={handleReportCommentClick} />
						);
					} else {
						return <SinglePost key={reaction.id} post={reaction as PostDetail} />;
					}
				})}
			</Stack>

			{hasNextPage && (
				<>
					<Box mt={2} textAlign='center'>
						<Button
							variant='outlined'
							onClick={() => fetchNextPage()}
							disabled={isFetchingNextPage}
							aria-label={isFetchingNextPage ? "Loading more reactions" : "Load more reactions"}
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

export default UserReactions;
