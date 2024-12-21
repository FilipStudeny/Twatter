import Typography from "@mui/material/Typography/Typography";
import { createFileRoute } from "@tanstack/react-router";
import { GraphQLClient } from "graphql-request/dist";
import { useEffect } from "react";


import { AppRoutes } from "../utils/routesConfig";
import { useAuthenticationStore } from "@Stores/authenticationStore";
import { useGetPostsListQuery } from "../../../Shared";

const client = new GraphQLClient("http://localhost:3000/graphql");

const Home = () => {
	const isLoggedIn = useAuthenticationStore((state) => state.isLoggedIn);

	const variables = { page: 1, limit: 10 };
	const { data, isLoading, error } = useGetPostsListQuery(client, variables);
	useEffect(() => {
		console.log(data?.getPosts);
		console.log("ERROR", error);
		console.log(isLoading);
	}, [data, error, isLoading]);

	return (
		<>
			{isLoggedIn && (
				<Typography variant='h4' sx={{ mb: 2 }}>
					Main Content
				</Typography>
			)}
			<Typography variant='h4' sx={{ mb: 2 }}>
				Main Content
			</Typography>
			<Typography sx={{ mb: 2 }}>
				Resize the window to see how the layout changes. On large screens, both sidebars start open by default.
			</Typography>
			<Typography sx={{ mb: 2 }}>
				The left sidebar acts as a navigation menu with submenus. The right sidebar shows a list of online users
				as simple cards.
			</Typography>
			<Typography sx={{ mb: 2 }}>
				On small screens, the right sidebar disappears, and the left sidebar becomes a temporary overlay. Use
				the top-left button to toggle the left sidebar. On large screens, toggle the right sidebar with the
				floating button at the bottom-right.
			</Typography>
			{Array.from({ length: 20 }).map((_, index) => (
				<Typography key={index}>This is some filler content line {index + 1}.</Typography>
			))}
		</>
	);
};

export const Route = createFileRoute(AppRoutes.HOME._)({ component: Home });
