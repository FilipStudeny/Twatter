// Home.tsx
import SinglePost from "@Components/post/PostCard";
import { GET_ERROR_LIST } from "@Utils/getResponseError";
import { Container, Typography, CircularProgress, Alert, Box, Stack } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { PostDetail, useGetPostsListQuery } from "../../../shared";
import { AppRoutes } from "../utils/routesConfig";

const Home = () => {
	const variables = { page: 1, limit: 10 };
	const { data, isLoading, isError, error } = useGetPostsListQuery(variables);

	useEffect(() => {
		console.log("Data:", data?.getPosts);
		console.log("Error:", error);
		console.log("Loading:", isLoading);
	}, [data, error, isLoading]);

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
			{data?.getPosts?.items?.length === 0 ? (
				<Typography variant='h6'>No posts available.</Typography>
			) : (
				<Stack spacing={4}>
					{data?.getPosts?.items?.map((post: PostDetail) => <SinglePost post={post} />)}
				</Stack>
			)}
		</Container>
	);
};

export const Route = createFileRoute(AppRoutes.HOME._)({ component: Home });
