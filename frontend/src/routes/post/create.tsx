import { GET_ERROR_LIST } from "@Utils/getResponseError";
import {
	Box,
	Button,
	Typography,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	CircularProgress,
	Container,
} from "@mui/material";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import EasyMDE from "easymde";
import { useEffect, useRef, useState } from "react";
import "easymde/dist/easymde.min.css";

import { CreatePostDto, useCreatePostMutation } from "../../../../shared";

export const Route = createFileRoute("/post/create")({
	component: RouteComponent,
});

function RouteComponent() {
	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
	const easyMDERef = useRef<EasyMDE | null>(null);
	const navigate = useNavigate();

	const [serverMessage, setServerMessage] = useState<string | null>(null);

	const { mutateAsync: createPost, isPending: isCreatingPost, error, isError } = useCreatePostMutation();

	useEffect(() => {
		if (!textAreaRef.current) return;

		const easyMDE = new EasyMDE({
			element: textAreaRef.current,
			toolbar: ["bold", "italic", "heading", "|", "quote", "link", "|", "ordered-list", "unordered-list"],
			spellChecker: false,
			minHeight: "150px",
			placeholder: "Write your post content here...",
		});
		easyMDERef.current = easyMDE;

		return () => {
			// Clean up the EasyMDE instance on unmount
			easyMDE.toTextArea();
			easyMDERef.current = null;
		};
	}, []);

	const handleCreatePost = async () => {
		if (!easyMDERef.current) return;

		const content = easyMDERef.current.value().trim();
		if (!content) return;

		const createPostDto: CreatePostDto = {
			content,
		};

		try {
			setServerMessage(null);

			const response = await createPost({ input: createPostDto });
			setServerMessage("Post created successfully");

			// Reset editor
			easyMDERef.current.value("");

			navigate({ to: "/post/$id", params: { id: response.CreatePost.message ?? "" } });

		} catch {
			const errorMessages = GET_ERROR_LIST(error);
			setServerMessage(errorMessages.join(", "));
		}
	};

	const errorMessages = isError ? GET_ERROR_LIST(error) : [];

	return (
		<Container maxWidth='lg' sx={{ py: 4 }}>
			<Card
				elevation={3}
				sx={{
					borderRadius: 2,
				}}
			>
				<CardHeader
					title='Create a New Post'
					subheader='Share your thoughts with the community'
					sx={{
						backgroundColor: (theme) => theme.palette.grey[100],
						borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
					}}
				/>

				<CardContent>
					<Typography variant='h6' gutterBottom>
						Post Details
					</Typography>

					{/* EasyMDE Editor Container */}
					<Box
						sx={{
							mt: 2,
							"& .EasyMDEContainer": {},
						}}
					>
						<textarea ref={textAreaRef} />
					</Box>

					{/* Display messages if any */}
					{serverMessage && (
						<Typography variant='body1' sx={{ mt: 3 }} color={isError ? "error" : "success.main"}>
							{serverMessage}
						</Typography>
					)}

					{isError &&
						errorMessages.map((msg, index) => (
							<Typography key={index} variant='body2' color='error' sx={{ mt: 1 }}>
								{msg}
							</Typography>
						))}
				</CardContent>

				<CardActions
					sx={{
						px: 3,
						py: 2,
						borderTop: (theme) => `1px solid ${theme.palette.divider}`,
						justifyContent: "space-between",
					}}
				>
					<Button
						variant='contained'
						onClick={handleCreatePost}
						disabled={isCreatingPost}
						loading={isCreatingPost}
					>
						{"Create new post"}
					</Button>

					{isCreatingPost && (
						<Box ml={2}>
							<CircularProgress size={24} />
						</Box>
					)}
				</CardActions>
			</Card>
		</Container>
	);
}
