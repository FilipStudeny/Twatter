import {
	Favorite as FavoriteIcon,
	Mood as MoodIcon,
	SentimentDissatisfied as SentimentDissatisfiedIcon,
	SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon,
	ThumbDown as ThumbDownIcon,
	ThumbUp as ThumbUpIcon,
} from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import {
	CreateOrUpdateReactionDto,
	ReactionsCount,
	ReactionTargetType,
	ReactionType,
	useAddReactionMutation,
	useGetCommentReactionsQuery,
	useGetPostReactionsQuery,
} from "../../../../shared";

const REACTION_CONFIG = {
	like: {
		icon: <ThumbUpIcon fontSize='small' />,
		color: "success",
		label: "Likes",
	},
	dislike: {
		icon: <ThumbDownIcon fontSize='small' />,
		color: "error",
		label: "Dislikes",
	},
	sad: {
		icon: <SentimentDissatisfiedIcon fontSize='small' />,
		color: "info",
		label: "Sad reactions",
	},
	smile: {
		icon: <MoodIcon fontSize='small' />,
		color: "warning",
		label: "Happy reactions",
	},
	angry: {
		icon: <SentimentVeryDissatisfiedIcon fontSize='small' />,
		color: "error",
		label: "Angry reactions",
	},
	love: {
		icon: <FavoriteIcon fontSize='small' />,
		color: "primary",
		label: "Love reactions",
	},
} as const;

export interface ReactionsRowProps {
	targetId: string,
	reactions: ReactionsCount,
	myReaction?: ReactionType,
	reactionTarget: ReactionTargetType,
}

export const ReactionsRow: React.FC<ReactionsRowProps> = ({ targetId, reactions, myReaction, reactionTarget }) => {
	const { mutateAsync: addReaction } = useAddReactionMutation();

	const { refetch: refetchPostReactions } = useGetPostReactionsQuery({ postId: targetId }, { enabled: false });
	const { refetch: refetchCommentReactions } = useGetCommentReactionsQuery({ commentId: targetId }, { enabled: false });

	const [localReactions, setLocalReactions] = useState<ReactionsCount>(reactions);
	const [loadingReaction, setLoadingReaction] = useState<ReactionType | null>(null);
	const [selectedReaction, setSelectedReaction] = useState<ReactionType | null>(myReaction ?? null);

	useEffect(() => {
		setLocalReactions(reactions);
	}, [reactions]);

	useEffect(() => {
		setSelectedReaction(myReaction ?? null);
	}, [myReaction]);

	const handleReactionClick = useCallback(
		async (reactionType: ReactionType) => {
			try {
				setLoadingReaction(reactionType);

				const dto: CreateOrUpdateReactionDto = {
					reactionType,
					targetId,
					targetType: reactionTarget,
				};
				await addReaction({ createOrUpdateReactionData: dto });
				console.log(`Reaction ${reactionType} created for target ${targetId}`);

				if (reactionTarget === ReactionTargetType.Post) {
					const { data } = await refetchPostReactions();
					if (data) {
						setLocalReactions(data.getPosts.items?.[0].reactions ?? reactions);
					}
				} else if (reactionTarget === ReactionTargetType.Comment) {
					const { data } = await refetchCommentReactions();
					if (data) {
						setLocalReactions(data.getCommentsList.items?.[0].reactions ?? reactions);
					}
				}

				setSelectedReaction(reactionType);
			} catch (error) {
				console.error("Error creating reaction:", error);
			} finally {
				setLoadingReaction(null);
			}
		},
		[targetId, reactionTarget, addReaction, refetchPostReactions, refetchCommentReactions, reactions],
	);

	return (
		<Stack direction='row' spacing={1.5} alignItems='center' sx={{ mb: 2, flexWrap: "wrap" }}>
			{(Object.keys(REACTION_CONFIG) as (keyof ReactionsCount)[]).map((type) => {
				const count = localReactions[type] || 0;
				const reactionType = type.toUpperCase() as ReactionType;

				return (
					<Button
						key={type}
						disabled={loadingReaction === reactionType}
						onClick={() => handleReactionClick(reactionType)}
						variant={selectedReaction && selectedReaction.toLowerCase() === type ? "contained" : "outlined"}
						color={REACTION_CONFIG[type as keyof typeof REACTION_CONFIG]?.color}
						sx={{
							textTransform: "capitalize",
							fontWeight: 500,
							height: 32,
							borderRadius: 2,
							px: 1,
							transition: "transform 0.2s ease, box-shadow 0.2s ease",
							"& .MuiButton-startIcon": {
								fontSize: "1rem",
								mr: 0.5,
							},
							"& .MuiButton-label": {
								fontSize: "0.95rem",
							},
							"&:hover": {
								transform: "scale(1.03)",
								boxShadow: (theme) => `0 2px 6px ${theme.palette.action.hover}`,
							},
						}}
						startIcon={REACTION_CONFIG[type as keyof typeof REACTION_CONFIG]?.icon}
					>
						{count}
					</Button>
				);
			})}
		</Stack>
	);
};
