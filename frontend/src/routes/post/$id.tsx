// PostDetailPage.tsx

import SinglePost from "@Components/post/SinglePost";
import CommentsSection from "@Components/post/comments/CommenSection";
import { GET_ERROR_LIST } from "@Utils/getResponseError";
import {
	Box,
	CircularProgress,
	Alert,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

import { useGetPostsListQuery } from "../../../../shared";

export const Route = createFileRoute("/post/$id")({ component: RouteComponent });

function RouteComponent() {
	const { id } = Route.useParams();
	const { data, isLoading, isError, error } = useGetPostsListQuery({ postId: id });

	if (isLoading) {
		return (
			<Box display='flex' justifyContent='center' mt={4}>
				<CircularProgress />
			</Box>
		);
	}

	if (isError) {
		return (
			<Box display='flex' justifyContent='center' mt={4}>
				{GET_ERROR_LIST(error).map((errMsg: string, index: number) => (
					<Alert key={index} severity='error' sx={{ marginTop: "5px" }}>
						{errMsg}
					</Alert>
				))}
			</Box>
		);
	}

	const post = data?.getPosts?.items?.[0];
	if (!post) {
		return (
			<Box display='flex' justifyContent='center' mt={4}>
				<Alert severity='warning'>Post not found.</Alert>
			</Box>
		);
	}

	return (
		<>
			<SinglePost post={post} canOpenComments={false} />
			<CommentsSection postId={id} />
		</>
	);
}

export default RouteComponent;
