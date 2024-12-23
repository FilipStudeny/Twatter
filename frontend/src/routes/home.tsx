// Home.tsx
import SinglePost, { Post } from "@Components/PostCard";
import { Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { useGetPostsListQuery } from "../../../shared";
import { AppRoutes } from "../utils/routesConfig";

const Home = () => {
	const variables = { page: 1, limit: 10 };
	const { data, isLoading, error } = useGetPostsListQuery(variables);

	useEffect(() => {
		console.log(data?.getPosts);
		console.log("ERROR", error);
		console.log(isLoading);
	}, [data, error, isLoading]);

	if (isLoading) {
		return <Typography>Loading...</Typography>;
	}

	if (error) {
		return <Typography>Error: {JSON.stringify(error)}</Typography>;
	}

	return (
		<>
			{data?.getPosts?.items?.map((post) => <SinglePost key={post.id} post={post as Post} />)}
		</>
	);
};

export const Route = createFileRoute(AppRoutes.HOME._)({ component: Home });
