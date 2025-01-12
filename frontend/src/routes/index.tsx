import SinglePost from "@Components/post/SinglePost";
import { GET_ERROR_LIST } from "@Utils/getResponseError";
import {
	Home as HomeIcon,
	FilterList as FilterListIcon,
	Interests as InterestsIcon,
	Category as CategoryIcon,
	Palette as PaletteIcon,
	Psychology as PsychologyIcon,
	SportsEsports as GamingIcon,
	Code as TechIcon,
	Favorite as FavoriteIcon,
} from "@mui/icons-material";
import { Alert, Box, Button, Container, Typography, CircularProgress, styled, Paper } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { useInfiniteScroll } from "hooks/infiniteScroll";

import { PostDetail, useGetInterestsQuery, useInfiniteGetPostsListQuery } from "../../../shared";

const POSTS_PER_PAGE = 5;

// Styled Components
const StyledContainer = styled(Container)(({ theme }) => ({
	marginTop: theme.spacing(5),
	maxWidth: "960px !important",
	padding: theme.spacing(0, 3),
	[theme.breakpoints.down("sm")]: {
		padding: theme.spacing(0, 2),
		marginTop: theme.spacing(3),
	},
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	height: "80vh",
	flexDirection: "column",
	gap: theme.spacing(2),
	"& .MuiCircularProgress-root": {
		color: theme.palette.primary.main,
	},
}));

const PostsContainer = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(3),
	transition: "all 0.3s ease",
}));

const EmptyStateBox = styled(Box)(({ theme }) => ({
	textAlign: "center",
	padding: theme.spacing(8),
	backgroundColor: theme.palette.background.paper,
	borderRadius: theme.shape.borderRadius * 2,
	marginTop: theme.spacing(3),
	border: `1px dashed ${theme.palette.divider}`,
	"& .MuiTypography-root": {
		color: theme.palette.text.secondary,
	},
}));

const LoadMoreContainer = styled(Box)(({ theme }) => ({
	textAlign: "center",
	marginTop: theme.spacing(6),
	marginBottom: theme.spacing(4),
}));

const LoadingSpinner = styled("div")(({ theme }) => ({
	display: "inline-block",
	width: theme.spacing(2),
	height: theme.spacing(2),
	marginRight: theme.spacing(1),
	border: `2px solid ${theme.palette.primary.main}`,
	borderBottomColor: "transparent",
	borderRadius: "50%",
	animation: "spin 1s linear infinite",
	"@keyframes spin": {
		to: {
			transform: "rotate(360deg)",
		},
	},
}));

const SentinelElement = styled(Box)({
	height: 1,
});

const PageHeader = styled(Box)(({ theme }) => ({
	marginBottom: theme.spacing(4),
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(3),
}));

const InterestsWrapper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(1.5),
	background: theme.palette.background.default,
	borderRadius: theme.shape.borderRadius * 2,
	border: `1px solid ${theme.palette.divider}`,
}));

const InterestsContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	gap: theme.spacing(1),
	overflowX: "auto",
	scrollBehavior: "smooth",
	"&::-webkit-scrollbar": {
		height: "4px",
	},
	"&::-webkit-scrollbar-track": {
		background: theme.palette.action.hover,
		borderRadius: theme.shape.borderRadius,
	},
	"&::-webkit-scrollbar-thumb": {
		background: theme.palette.primary.main,
		borderRadius: theme.shape.borderRadius,
		"&:hover": {
			background: theme.palette.primary.dark,
		},
	},
}));

const InterestButton = styled(Button)(({ theme }) => ({
	whiteSpace: "nowrap",
	minWidth: "auto",
	padding: theme.spacing(0.5, 1.5),
	paddingLeft: theme.spacing(1),
	borderRadius: theme.shape.borderRadius * 2,
	textTransform: "none",
	fontSize: "0.85rem",
	fontWeight: 500,
	transition: "all 0.2s ease",
	borderColor: theme.palette.divider,
	height: 32,
	"& .MuiButton-startIcon": {
		marginRight: theme.spacing(0.5),
	},
	"& .MuiSvgIcon-root": {
		fontSize: "1.2rem",
	},
	"&:hover": {
		transform: "translateY(-1px)",
		boxShadow: theme.shadows[1],
	},
	"&.selected": {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		borderColor: "transparent",
		"&:hover": {
			backgroundColor: theme.palette.primary.dark,
			transform: "translateY(-1px)",
		},
	},
}));

const LoadMoreButton = styled(Button)(({ theme }) => ({
	padding: theme.spacing(1, 4),
	borderRadius: theme.shape.borderRadius * 2,
	textTransform: "none",
	fontSize: "0.95rem",
	fontWeight: 500,
	minWidth: 140,
	boxShadow: "none",
	"&:hover": {
		boxShadow: theme.shadows[2],
	},
	"&.Mui-disabled": {
		backgroundColor: theme.palette.action.disabledBackground,
	},
}));

// Icon mapping for interests
const interestIcons: Record<string, React.ReactNode> = {
	default: <HomeIcon />,
	Art: <PaletteIcon />,
	Technology: <TechIcon />,
	Gaming: <GamingIcon />,
	Psychology: <PsychologyIcon />,
	Health: <FavoriteIcon />,
	// Add more mappings as needed
};

// Route Configuration
export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
	const { data: interestsData, isLoading: isLoadingInterests } = useGetInterestsQuery();

	const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteGetPostsListQuery(
			{ page: 0, limit: 0, interestId: selectedInterest },
			{
				initialPageParam: { page: 1, limit: POSTS_PER_PAGE },
				getNextPageParam: (lastPage) => {
					const currentPage = lastPage?.getPosts?.page ?? 1;
					const limit = lastPage?.getPosts?.limit ?? POSTS_PER_PAGE;
					const total = lastPage?.getPosts?.total ?? 0;

					return currentPage * limit < total ? { page: currentPage + 1, limit } : undefined;
				},
			},
		);

	const { sentinelRef } = useInfiniteScroll(Boolean(hasNextPage), isFetchingNextPage, fetchNextPage);
	const posts = data?.pages?.flatMap((page) => page?.getPosts?.items ?? []) ?? [];

	const handleInterestClick = (interestId: string) => {
		setSelectedInterest(selectedInterest === interestId ? null : interestId);
	};

	if (isLoading) {
		return (
			<LoadingContainer>
				<CircularProgress size={40} thickness={4} />
				<Typography variant='body2' color='textSecondary'>
					Loading posts...
				</Typography>
			</LoadingContainer>
		);
	}

	if (isError && error) {
		return (
			<StyledContainer>
				{GET_ERROR_LIST(error).map((message: string, index: number) => (
					<Alert
						key={index}
						severity='error'
						variant='outlined'
						sx={{
							mb: 1,
							borderRadius: 2,
						}}
					>
						{message}
					</Alert>
				))}
			</StyledContainer>
		);
	}

	return (
		<StyledContainer>
			<PageHeader>
				<Typography
					variant='h4'
					sx={{
						fontWeight: 700,
						letterSpacing: "-0.5px",
						display: "flex",
						alignItems: "center",
						gap: 1,
					}}
				>
					<InterestsIcon sx={{ fontSize: 32 }} />
					Latest Posts
				</Typography>

				<InterestsWrapper elevation={0}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 1,
							mb: 1.5,
							px: 0.5,
						}}
					>
						<FilterListIcon fontSize='small' sx={{ color: "text.secondary" }} />
						<Typography
							variant='body2'
							sx={{
								color: "text.secondary",
								fontWeight: 500,
							}}
						>
							Filter by interest
						</Typography>
					</Box>

					<InterestsContainer>
						<InterestButton
							variant='outlined'
							className={!selectedInterest ? "selected" : ""}
							onClick={() => setSelectedInterest(null)}
							startIcon={<HomeIcon />}
						>
							All Posts
						</InterestButton>
						{interestsData?.GetInterests?.items?.map((interest) => (
							<InterestButton
								key={interest.id}
								variant='outlined'
								className={selectedInterest === interest.id ? "selected" : ""}
								onClick={() => handleInterestClick(interest.id ?? "")}
								startIcon={interestIcons[interest.name ?? ""] || <CategoryIcon />}
							>
								{interest.name}
							</InterestButton>
						))}
					</InterestsContainer>
				</InterestsWrapper>
			</PageHeader>

			{isLoadingInterests ? (
				<LoadingContainer sx={{ height: "100px" }}>
					<CircularProgress size={24} />
				</LoadingContainer>
			) : (
				<PostsList posts={posts} />
			)}

			{hasNextPage && (
				<LoadMoreSection
					isFetchingNextPage={isFetchingNextPage}
					onLoadMore={fetchNextPage}
					sentinelRef={sentinelRef}
				/>
			)}
		</StyledContainer>
	);
}

interface PostsListProps {
	posts: PostDetail[],
}

function PostsList({ posts }: PostsListProps) {
	if (posts.length === 0) {
		return (
			<EmptyStateBox>
				<Typography variant='h6'>No posts available yet.</Typography>
				<Typography variant='body2' sx={{ mt: 1, opacity: 0.8 }}>
					Check back later for new content
				</Typography>
			</EmptyStateBox>
		);
	}

	return (
		<PostsContainer>
			{posts.map((post: PostDetail) => (
				<SinglePost key={post.id} post={post} canOpenComments />
			))}
		</PostsContainer>
	);
}

interface LoadMoreSectionProps {
	isFetchingNextPage: boolean,
	onLoadMore: ()=> void,
	sentinelRef: React.RefObject<HTMLDivElement>,
}

function LoadMoreSection({ isFetchingNextPage, onLoadMore, sentinelRef }: LoadMoreSectionProps) {
	return (
		<>
			<LoadMoreContainer>
				<LoadMoreButton variant='contained' onClick={onLoadMore} disabled={isFetchingNextPage}>
					{isFetchingNextPage ? (
						<>
							<LoadingSpinner />
							Loading more posts...
						</>
					) : (
						"Load More Posts"
					)}
				</LoadMoreButton>
			</LoadMoreContainer>
			<SentinelElement ref={sentinelRef} />
		</>
	);
}

export default HomePage;
