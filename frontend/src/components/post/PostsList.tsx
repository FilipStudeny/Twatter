// UserPosts.tsx

import SinglePost from "@Components/post/SinglePost";
import { GET_ERROR_LIST } from "@Utils/getResponseError";
import { Box, Button, Alert, Stack } from "@mui/material";
import React, { useCallback, useMemo } from "react";

import { useInfiniteScroll } from "hooks/infiniteScroll";

import { PostSkeleton } from "./PostSkeleton";
import { PostDetail, useInfiniteGetPostsListQuery } from "../../../../shared";

interface PostsListProps {
	userId?: string | undefined,
	interestsId?: string | undefined,
}

const PostsList: React.FC<PostsListProps> = ({ userId, interestsId }) => {
	const {
		data: userPosts,
		isLoading,
		isError: postsError,
		error: postsErrorMessage,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteGetPostsListQuery(
		{ creatorId: userId, page: 1, limit: 5, interestId: interestsId },
		{
			initialPageParam: { page: 1, limit: 5, creatorId: userId, interestId: interestsId },

			getNextPageParam: useCallback((lastPage) => {
				const currentPage = lastPage?.getPosts?.page ?? 1;
				const limit = lastPage?.getPosts?.limit ?? 10;
				const total = lastPage?.getPosts?.total ?? 0;

				return currentPage * limit < total ? { page: currentPage + 1, limit } : undefined;
			}, []),
		},
	);

	const { sentinelRef } = useInfiniteScroll(Boolean(hasNextPage), isFetchingNextPage, fetchNextPage);

	const allPosts = useMemo(() => userPosts?.pages?.flatMap((page) => page?.getPosts?.items ?? []) ?? [], [userPosts]);

	const renderLoadingSkeletons = () => (
		<Stack spacing={4} sx={{ width: "100%" }}>
			{[1, 2, 3].map((i) => (
				<PostSkeleton key={i} />
			))}
		</Stack>
	);

	return (
		<Box sx={{ px: 2, py: 1 }} role='tabpanel' id='tabpanel-posts' aria-labelledby='tab-posts'>
			{postsError &&
				GET_ERROR_LIST(postsErrorMessage).map((errMsg: string, index: number) => (
					<Alert key={index} severity='error' sx={{ marginTop: "5px" }}>
						{errMsg}
					</Alert>
				))}

			{!isLoading && allPosts.length === 0 && !postsError && (
				<Alert severity='info' sx={{ marginTop: "5px" }}>
					No posts available.
				</Alert>
			)}

			<Stack spacing={4}>
				{allPosts.map((post: PostDetail) => (
					<SinglePost key={post.id} post={post} canOpenComments />
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

			{(isLoading || isFetchingNextPage) && renderLoadingSkeletons()}
		</Box>
	);
};

export default PostsList;
