import { GET_ERROR_LIST } from "@Utils/getResponseError";
import { Box, Button, Typography, Paper, CircularProgress } from "@mui/material";
import EasyMDE from "easymde";
import React, { useEffect, useRef, useState } from "react";
import "easymde/dist/easymde.min.css";

import { CreateCommentDto, useCreateCommentMutation } from "../../../../../shared";

interface CreateCommentFormProps {
	postId: string,
	refetchComments: ()=> void,
}

const CreateCommentForm: React.FC<CreateCommentFormProps> = ({ postId, refetchComments }) => {
	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
	const easyMDERef = useRef<EasyMDE | null>(null);

	const [serverMessage, setServerMessage] = useState<string | null>(null);
	const { mutateAsync: createComment, isPending: isCreatingComment, error, isError } = useCreateCommentMutation();

	useEffect(() => {
		if (!textAreaRef.current) return;

		const easyMDE = new EasyMDE({
			element: textAreaRef.current,
			toolbar: ["bold", "italic", "heading", "|", "quote", "link", "|", "ordered-list", "unordered-list"],
			spellChecker: false,
			minHeight: "150px",
		});
		easyMDERef.current = easyMDE;

		return () => {
			easyMDE.toTextArea();
			easyMDERef.current = null;
		};
	}, []);

	const handlePostComment = async () => {
		if (!easyMDERef.current) return;

		const content = easyMDERef.current.value().trim();
		if (!content) return;

		const commentDto: CreateCommentDto = {
			content,
			postId,
		};

		try {
			setServerMessage(null);

			const response = await createComment({ createComment: commentDto });
			setServerMessage(response?.CreateComment.message ?? "Comment added successfully");

			easyMDERef.current.value("");
			refetchComments();
		} catch {
			const errorMessages = GET_ERROR_LIST(error);
			setServerMessage(errorMessages.join(", "));
		}
	};

	const errorMessages = isError ? GET_ERROR_LIST(error) : [];

	return (
		<Paper sx={{ p: 2, mb: 3 }} elevation={3}>
			<Typography variant='h6' gutterBottom>
				Leave a Comment
			</Typography>

			<textarea ref={textAreaRef} />

			<Box mt={2} display='flex' alignItems='center' gap={2}>
				<Button variant='contained' onClick={handlePostComment} disabled={isCreatingComment}>
					{isCreatingComment ? "Posting..." : "Post comment"}
				</Button>
				{isCreatingComment && <CircularProgress size={24} />}
			</Box>

			{serverMessage && (
				<Typography variant='body1' sx={{ mt: 2 }} color={isError ? "error" : "success.main"}>
					{serverMessage}
				</Typography>
			)}

			{isError &&
				errorMessages.map((msg, index) => (
					<Typography key={index} variant='body2' color='error'>
						{msg}
					</Typography>
				))}
		</Paper>
	);
};

export default CreateCommentForm;
