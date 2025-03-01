import { Box, Button, Typography, Paper } from "@mui/material";
import EasyMDE from "easymde";
import React, { useEffect, useRef } from "react";
import "easymde/dist/easymde.min.css";

interface CreateCommentFormProps {
	onSubmit: (content: string)=> void,
}

const CreateCommentForm: React.FC<CreateCommentFormProps> = ({ onSubmit }) => {
	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
	const easyMDERef = useRef<EasyMDE | null>(null);

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

	const handlePostComment = () => {
		if (!easyMDERef.current) return;

		const content = easyMDERef.current.value().trim();
		if (!content) return;

		onSubmit(content);
		easyMDERef.current.value("");
	};

	return (
		<Paper sx={{ p: 2, mb: 3 }} elevation={3}>
			<Typography variant='h6' gutterBottom>
				Leave a Comment
			</Typography>

			<textarea ref={textAreaRef} />

			<Box mt={2}>
				<Button variant='contained' onClick={handlePostComment}>
					Post comment
				</Button>
			</Box>
		</Paper>
	);
};

export default CreateCommentForm;
