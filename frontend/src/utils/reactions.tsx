// reactions.ts
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoodIcon from "@mui/icons-material/Mood";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

export const reactionIcons: Record<string, JSX.Element> = {
	like: <ThumbUpIcon fontSize="small" />,
	dislike: <ThumbDownIcon fontSize="small" />,
	sad: <SentimentDissatisfiedIcon fontSize="small" />,
	smile: <MoodIcon fontSize="small" />,
	angry: <SentimentVeryDissatisfiedIcon fontSize="small" />,
	love: <FavoriteIcon fontSize="small" />,
};

export const reactionChipColors: Record<
	string,
  "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
> = {
	like: "success",
	dislike: "error",
	sad: "info",
	smile: "warning",
	angry: "error",
	love: "primary",
};
