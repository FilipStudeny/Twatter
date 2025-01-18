import {
	Home as HomeIcon,
	Category as CategoryIcon,
	Palette as PaletteIcon,
	Psychology as PsychologyIcon,
	SportsEsports as GamingIcon,
	Code as TechIcon,
	Favorite as FavoriteIcon,
} from "@mui/icons-material";
import { Box, Button, Alert } from "@mui/material";
import React, { useCallback } from "react";

import { useGetInterestsQuery } from "../../../../shared";

const interestIcons: Record<string, React.ReactNode> = {
	default: <HomeIcon />,
	Art: <PaletteIcon />,
	Technology: <TechIcon />,
	Gaming: <GamingIcon />,
	Psychology: <PsychologyIcon />,
	Health: <FavoriteIcon />,
};

const buttonStyles = {
	whiteSpace: "nowrap",
	width: "auto",
	minWidth: "120px",
	p: "6px 12px",
	borderRadius: 3,
	textTransform: "none",
	fontSize: "0.85rem",
	fontWeight: 500,
	letterSpacing: "0.2px",
	justifyContent: "flex-start",
	transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
	borderColor: "divider",
	height: 36,
};

const selectedStyles = {
	bgcolor: "primary.main",
	color: "primary.contrastText",
	borderColor: "transparent",
	"&:hover": {
		bgcolor: "primary.dark",
		transform: "translateX(4px)",
	},
};

interface InterestsListProps {
	selectedInterest: string | null,
	onSelectInterest: (interestId: string | null)=> void,
}

const InterestsList = React.memo(({ selectedInterest, onSelectInterest }: InterestsListProps) => {
	const { data } = useGetInterestsQuery();

	const handleInterestSelect = useCallback((interestId: string) => {
		onSelectInterest(selectedInterest === interestId ? null : interestId);
	}, [selectedInterest, onSelectInterest]);

	if (!data?.GetInterests?.items?.length) {
		return (
			<Box sx={{ p: 2 }}>
				<Alert severity="info" sx={{ marginTop: "5px" }}>
					No interests available.
				</Alert>
			</Box>
		);
	}

	return (
		<Box
			sx={{
				position: "sticky",
				top: 3,
				p: 2,
				height: "fit-content",
				"@media (max-width: 900px)": {
					position: "static",
				},
				backgroundColor: "white",
			}}
		>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
				<Button
					variant='outlined'
					onClick={() => handleInterestSelect("")}
					startIcon={<HomeIcon />}
					sx={{
						...buttonStyles,
						...(selectedInterest === null && selectedStyles),
					}}
				>
					All Posts
				</Button>
				{data.GetInterests.items.map((interest) => (
					<Button
						key={interest.id}
						variant='outlined'
						onClick={() => handleInterestSelect(interest.id ?? "")}
						startIcon={interestIcons[interest.name ?? ""] || <CategoryIcon />}
						sx={{
							...buttonStyles,
							...(selectedInterest === interest.id && selectedStyles),
						}}
					>
						{interest.name}
					</Button>
				))}
			</Box>
		</Box>
	);
});

export default InterestsList;
