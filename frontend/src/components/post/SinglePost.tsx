import { RouterLink } from "@Components/navigation/routerLink";
import { ReportButton } from "@Components/report/ReportButton";
import {
	Category as CategoryIcon,
	Comment as CommentIcon,
	Favorite as FavoriteIcon,
	Group as GroupIcon,
	Mood as MoodIcon,
	SentimentDissatisfied as SentimentDissatisfiedIcon,
	SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon,
	ThumbDown as ThumbDownIcon,
	ThumbUp as ThumbUpIcon,
	ZoomIn as ZoomInIcon,
} from "@mui/icons-material";
import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Chip,
	Dialog,
	IconButton,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

import CommentsModal from "./comments/CommentsModal";
import { CreateOrUpdateReactionDto, PostDetail, ReactionsCount, ReactionTargetType, ReactionType, useAddReactionMutation, useGetPostReactionsQuery } from "../../../../shared";

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

export interface ReactionRowProps {
	targetId: string,
	reactions: ReactionsCount,
	myReaction?: ReactionType,
	reactionTarget: ReactionTargetType,
}

export const ReactionRow: React.FC<ReactionRowProps> = ({ targetId, reactions, myReaction, reactionTarget }) => {
	const { mutateAsync: addReaction } = useAddReactionMutation();
	const { refetch } = useGetPostReactionsQuery({ postId: targetId }, { enabled: false });

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

				const { data } = await refetch();
				if (data) {
					setLocalReactions(data.getPosts.items?.[0].reactions ?? reactions);
					setSelectedReaction(reactionType);
				} else {
					setSelectedReaction(reactionType);
				}
			} catch (error) {
				console.error("Error creating reaction:", error);
			} finally {
				setLoadingReaction(null);
			}
		},
		[targetId, reactionTarget, addReaction, refetch, reactions],
	);

	return (
		<Stack direction='row' spacing={1.5} alignItems='center' sx={{ mb: 2, flexWrap: "wrap" }}>
			{(Object.keys(REACTION_CONFIG) as (keyof ReactionsCount)[]).map((type) => {
				const count = localReactions[type] || 0;
				const reactionType = type.toUpperCase() as ReactionType;

				return (
					<Button
						key={type}
						loading={loadingReaction === reactionType}
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

interface SinglePostProps {
	post: PostDetail,
	canOpenComments?: boolean,
}

export function SinglePost({ post, canOpenComments = false }: SinglePostProps) {
	const theme = useTheme();
	const [isCommentsOpen, setIsCommentsOpen] = useState(false);
	const [isImageOpen, setIsImageOpen] = useState(false);

	const avatarLetter = post.creator.username?.charAt(0).toUpperCase() ?? "?";

	return (
		<>
			<Card
				elevation={2}
				sx={{
					borderRadius: 2,
					transition: theme.transitions.create(["box-shadow"]),
					"&:hover": {
						boxShadow: theme.shadows[4],
					},
				}}
			>
				<CardHeader
					avatar={<Avatar src={post.creator.profilePictureUrl || undefined}>{avatarLetter}</Avatar>}
					action={<ReportButton reportTarget={post} />}
					title={
						<Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
							{post.creator.username}
						</Typography>
					}
					subheader={
						<Typography variant='caption' color='text.secondary'>
							{dayjs(post.createdAt).format("MMM D, YYYY h:mm A")}
						</Typography>
					}
					sx={{ pb: 1 }}
				/>

				<CardContent>
					{/* Content section remains the same */}
					{post.content && (
						<RouterLink to={`/post/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
							<Typography
								variant='body2'
								sx={{
									mb: 2,
									whiteSpace: "pre-line",
									"&:hover": {
										color: theme.palette.primary.main,
									},
								}}
							>
								{post.content}
							</Typography>
						</RouterLink>
					)}

					{/* Image section remains the same */}
					{post.postPicture && (
						<Box sx={{ position: "relative", mb: 2 }}>
							<Box
								component='img'
								src={post.postPicture}
								alt={`Post by ${post.creator.username}`}
								sx={{
									width: "100%",
									borderRadius: 2,
									aspectRatio: "16/9",
									objectFit: "cover",
									cursor: "pointer",
									transition: theme.transitions.create(["transform", "filter"]),
									"&:hover": {
										transform: "scale(1.01)",
										filter: "brightness(0.95)",
									},
								}}
								onClick={() => setIsImageOpen(true)}
							/>
							<IconButton
								size='small'
								sx={{
									position: "absolute",
									right: 8,
									bottom: 8,
									bgcolor: "rgba(0, 0, 0, 0.5)",
									color: "white",
									"&:hover": {
										bgcolor: "rgba(0, 0, 0, 0.7)",
									},
								}}
								onClick={() => setIsImageOpen(true)}
							>
								<ZoomInIcon fontSize='small' />
							</IconButton>
						</Box>
					)}

					{/* Use the ReactionRow component */}
					{post.reactions && (
						<ReactionRow
							reactions={post.reactions}
							myReaction={post.myReaction ?? undefined}
							targetId={post.id}
							reactionTarget={ReactionTargetType.Post}
						/>
					)}

					{/* Bottom chips section */}
					<Stack
						direction='row'
						spacing={2}
						sx={{
							flexWrap: "wrap",
							gap: 2,
						}}
					>
						<Chip
							icon={<CategoryIcon />}
							label={post.interest?.name ?? "—"}
							size='small'
							variant='outlined'
							color='default'
							sx={{
								height: "28px",
								borderRadius: 2,
								transition: "all 0.2s ease-in-out",
								"&:hover": {
									transform: "translateY(-1px)",
									boxShadow: (theme) => `0 2px 8px ${theme.palette.action.hover}`,
									backgroundColor: "action.hover",
								},
							}}
							clickable
						/>

						{post.group && (
							<Chip
								icon={<GroupIcon />}
								label={post.group.name}
								size='small'
								variant='outlined'
								color='default'
								sx={{
									height: "28px",
									borderRadius: 2,
									transition: "all 0.2s ease-in-out",
									"&:hover": {
										transform: "translateY(-1px)",
										boxShadow: (theme) => `0 2px 8px ${theme.palette.action.hover}`,
										backgroundColor: "action.hover",
									},
								}}
							/>
						)}

						{canOpenComments && (
							<Chip
								icon={<CommentIcon />}
								label={`Comments: ${post.commentsCount ?? 0}`}
								size='small'
								variant='outlined'
								color='primary'
								clickable
								onClick={() => setIsCommentsOpen(true)}
								sx={{
									height: "28px",
									borderRadius: 2,
									transition: "all 0.2s ease-in-out",
									"&:hover": {
										transform: "translateY(-1px)",
										boxShadow: (theme) => `0 2px 8px ${theme.palette.action.hover}`,
										backgroundColor: "action.hover",
									},
								}}
							/>
						)}
					</Stack>
				</CardContent>
			</Card>

			<CommentsModal open={isCommentsOpen} onClose={() => setIsCommentsOpen(false)} postId={post.id} />

			<Dialog
				open={isImageOpen}
				onClose={() => setIsImageOpen(false)}
				maxWidth='lg'
				PaperProps={{
					sx: {
						bgcolor: "transparent",
						boxShadow: "none",
						maxHeight: "90vh",
						maxWidth: "90vw",
					},
				}}
			>
				<Box
					component='img'
					src={post.postPicture ?? ""}
					alt={`Post by ${post.creator.username}`}
					sx={{
						width: "100%",
						height: "100%",
						objectFit: "contain",
					}}
				/>
			</Dialog>
		</>
	);
}

export default SinglePost;
