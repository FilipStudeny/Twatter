import { RouterLink } from "@Components/navigation/routerLink";
import { GET_ERROR_LIST } from "@Utils/getResponseError";
import PeopleIcon from "@mui/icons-material/People";
import {
	Alert,
	Avatar,
	Box,
	Button,
	Card,
	CircularProgress,
	Container,
	Divider,
	Grid,
	Paper,
	Typography,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

import { useInfiniteScroll } from "hooks/infiniteScroll";

import { useInfiniteGetUsersListQuery, UserDetail } from "../../../../shared";

export const Route = createFileRoute("/users/")({
	component: RouteComponent,
});

// Modern user card
function SingleUser({ user }: { user: UserDetail }) {
	const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
	const displayName = user.username?.trim() || fullName;

	return (
		<Card
			sx={{
				position: "relative",
				overflow: "visible",
				borderRadius: 2,
				boxShadow: 3,
				transition: "transform 0.3s, box-shadow 0.3s",
				cursor: "pointer",
				"&:hover": {
					transform: "translateY(-2px) scale(1.01)",
					boxShadow: 5,
				},
			}}
		>
			<RouterLink
				to='/users/$id'
				params={{ id: user.id }}
				style={{ textDecoration: "none", color: "inherit" }} // ensures text color doesn't change
			>
				<Box
					sx={{
						background: "linear-gradient(45deg, #6a11cb 30%, #2575fc 90%)",
						height: 100,
						borderTopLeftRadius: 8,
						borderTopRightRadius: 8,
					}}
				/>
				<Avatar
					sx={{
						width: 80,
						height: 80,
						position: "absolute",
						top: 50,
						left: "50%",
						transform: "translateX(-50%)",
						border: "3px solid white",
						boxShadow: 2,
					}}
					src={user.profilePictureUrl || ""}
					alt={fullName || "Unknown User"}
				/>
				<Box
					sx={{
						pt: 6,
						pb: 2,
						textAlign: "center",
						px: 2, // Some horizontal padding so the text won't clip
					}}
				>
					<Typography
						variant='subtitle1'
						fontWeight='bold'
						noWrap
						sx={{
							textOverflow: "ellipsis",
							overflow: "hidden",
							display: "block",
						}}
						title={displayName || fullName} // tooltip if truncated
					>
						{displayName || fullName}
					</Typography>

					{user.username && (
						<Typography
							variant='body2'
							color='text.secondary'
							noWrap
							sx={{
								textOverflow: "ellipsis",
								overflow: "hidden",
								display: "block",
							}}
							title={fullName} // tooltip if truncated
						>
							{fullName}
						</Typography>
					)}
				</Box>
			</RouterLink>
		</Card>
	);
}

function RouteComponent() {
	const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteGetUsersListQuery(
			{ page: 0, limit: 0 },
			{
				initialPageParam: { page: 1, limit: 5 },
				getNextPageParam: (lastPage) => {
					const currentPage = lastPage?.getUsers?.page ?? 1;
					const limit = lastPage?.getUsers?.limit ?? 5;
					const total = lastPage?.getUsers?.total ?? 0;

					if (currentPage * limit < total) {
						return { page: currentPage + 1, limit };
					}

					return undefined;
				},
			},
		);

	const { sentinelRef } = useInfiniteScroll(Boolean(hasNextPage), isFetchingNextPage, fetchNextPage);

	const allUsers: UserDetail[] = data?.pages?.flatMap((page) => page?.getUsers?.items ?? []) ?? [];

	// Loading state
	if (isLoading) {
		return (
			<Box display='flex' justifyContent='center' alignItems='center' height='80vh'>
				<CircularProgress />
			</Box>
		);
	}

	// Error state
	if (isError && error) {
		return (
			<Container sx={{ mt: 4 }}>
				{GET_ERROR_LIST(error).map((errMsg: string, index: number) => (
					<Alert key={index} severity='error' sx={{ mb: 1 }}>
						{errMsg}
					</Alert>
				))}
			</Container>
		);
	}

	return (
		<Container
			sx={{
				py: 4,
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				gap: 4,
			}}
		>
			<Paper
				elevation={3}
				sx={{
					p: 4,
					borderRadius: 2,
					background: "linear-gradient(to bottom right, #fff, #f7f9fc)",
				}}
			>
				{/* Title on the left with icon */}
				<Box display='flex' alignItems='center' sx={{ justifyContent: "flex-start" }}>
					<Typography variant='h5' fontWeight='bold' sx={{ letterSpacing: 1, color: "primary.main" }}>
						Users
					</Typography>
					<PeopleIcon sx={{ fontSize: 28, ml: 1, color: "primary.main" }} />
				</Box>

				{/* Divider under the title */}
				<Divider sx={{ my: 2 }} />

				{/* Main Content Section */}
				{allUsers.length === 0 ? (
					<Typography variant='h6' color='text.secondary' textAlign='center' sx={{ mt: 4 }}>
						No users available.
					</Typography>
				) : (
					<Grid container spacing={3}>
						{allUsers.map((user) => (
							<Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
								<SingleUser user={user} />
							</Grid>
						))}
					</Grid>
				)}
			</Paper>

			{/* Load More Section */}
			{hasNextPage && (
				<Box textAlign='center' mt='auto'>
					<Button
						variant='contained'
						onClick={() => fetchNextPage()}
						disabled={isFetchingNextPage}
						sx={{
							py: 1.2,
							px: 4,
							textTransform: "none",
						}}
					>
						{isFetchingNextPage ? "Loading..." : "Load More"}
					</Button>
				</Box>
			)}

			{/* Sentinel div for infinite scrolling */}
			<Box ref={sentinelRef} height='1px' />
		</Container>
	);
}

export default RouteComponent;
