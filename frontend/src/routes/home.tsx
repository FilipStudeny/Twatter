// Home.tsx

import SinglePost from "@Components/post/SinglePost";
import { GET_ERROR_LIST } from "@Utils/getResponseError";
import { Container, Typography, CircularProgress, Alert, Box, Stack, Button } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

import { useInfiniteScroll } from "hooks/infiniteScroll";

import { PostDetail, useInfiniteGetPostsListQuery } from "../../../shared";
import { AppRoutes } from "../utils/routesConfig";

const Home: React.FC = () => {
	const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteGetPostsListQuery(
			{ page: 0, limit: 0 },
			{
				initialPageParam: { page: 1, limit: 5 },

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

	const allPosts: PostDetail[] = data?.pages?.flatMap((page) => page?.getPosts?.items ?? []) ?? [];

	if (isLoading) {
		return (
			<Box display='flex' justifyContent='center' alignItems='center' height='80vh'>
				<CircularProgress />
			</Box>
		);
	}

	if (isError && error) {
		return (
			<Container sx={{ mt: 4 }}>
				{GET_ERROR_LIST(error).map((errMsg: string, index: number) => (
					<Alert key={index} severity='error' sx={{ marginTop: "5px" }}>
						{errMsg}
					</Alert>
				))}
			</Container>
		);
	}

	return (
		<Container sx={{ mt: 4 }}>
			<Typography variant='h4' gutterBottom>
				Latest Posts
			</Typography>

			{allPosts.length === 0 ? (
				<Typography variant='h6'>No posts available.</Typography>
			) : (
				<Stack spacing={4}>
					{allPosts.map((post: PostDetail) => (
						<SinglePost key={post.id} post={post} canOpenComments />
					))}
				</Stack>
			)}

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
		</Container>
	);
};

export const Route = createFileRoute(AppRoutes.HOME._)({ component: Home });
export default Home;
