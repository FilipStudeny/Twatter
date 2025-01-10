// UserPosts.tsx

import SinglePost from "@Components/post/SinglePost";
import { GET_ERROR_LIST } from "@Utils/getResponseError";
import { Box, Button, CircularProgress, Alert, Stack } from "@mui/material";
import React from "react";

import { useInfiniteScroll } from "hooks/infiniteScroll";

import { PostDetail, useInfiniteGetPostsListQuery } from "../../../../shared";

interface UserPostsProps {
	userId: string,
}

const UserPosts: React.FC<UserPostsProps> = ({ userId }) => {
	const {
		data: userPosts,
		isLoading: postsLoading,
		isError: postsError,
		error: postsErrorMessage,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteGetPostsListQuery(
		{ creatorId: userId, page: 1, limit: 5 },
		{
			initialPageParam: { page: 1, limit: 5, creatorId: userId },

			getNextPageParam: (lastPage) => {
				const currentPage = lastPage?.getPosts?.page ?? 1;
				const limit = lastPage?.getPosts?.limit ?? 5;
				const total = lastPage?.getPosts?.total ?? 0;
				if (currentPage * limit < total) {
					return { page: currentPage + 1, limit };
				}

				return undefined;
			},
		},
	);

	const { sentinelRef } = useInfiniteScroll(Boolean(hasNextPage), isFetchingNextPage, fetchNextPage);

	const allPosts: PostDetail[] = userPosts?.pages?.flatMap((page) => page?.getPosts?.items ?? []) ?? [];

	return (
		<Box sx={{ px: 2, py: 1 }} role='tabpanel' id='tabpanel-posts' aria-labelledby='tab-posts'>
			{postsError &&
				GET_ERROR_LIST(postsErrorMessage).map((errMsg: string, index: number) => (
					<Alert key={index} severity='error' sx={{ marginTop: "5px" }}>
						{errMsg}
					</Alert>
				))}

			{!postsLoading && allPosts.length === 0 && !postsError && (
				<Alert severity='info' sx={{ marginTop: "5px" }}>
					No posts available.
				</Alert>
			)}

			<Stack spacing={4}>
				{allPosts.map((post: PostDetail) => (
					<SinglePost key={post.id} post={post} canOpenComments/>
				))}
			</Stack>

			{hasNextPage && (
				<>
					<Box textAlign='center' mt={4}>
						<Button variant='contained' onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
							{isFetchingNextPage ? "Loading..." : "Load More"}
						</Button>
					</Box>

					<Box ref={sentinelRef} height='1px' />
				</>
			)}

			{postsLoading && (
				<Box p={2} display='flex' justifyContent='center' alignItems='center'>
					<CircularProgress />
				</Box>
			)}
		</Box>
	);
};

export default UserPosts;
