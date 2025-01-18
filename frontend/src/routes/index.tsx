import InterestsList from "@Components/post/InterestsList";
import PostsList from "@Components/post/PostsList";
import { Box } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";

// Route Configuration
export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	const [selectedInterest, setSelectedInterest] = useState<string | null>(null);

	const handleInterestSelect = useCallback((interestId: string | null) => {
		setSelectedInterest(interestId);
	}, []);

	return (
		<Box
			sx={{
				display: "grid",
				gridTemplateColumns: "150px 1fr",
				width: "100%",
				gap: 1,
				"@media (max-width: 900px)": {
					gridTemplateColumns: "1fr",
				},
			}}
		>
			<InterestsList selectedInterest={selectedInterest} onSelectInterest={handleInterestSelect} />{" "}
			<PostsList interestsId={selectedInterest ?? undefined} />
		</Box>
	);
}

export default HomePage;
