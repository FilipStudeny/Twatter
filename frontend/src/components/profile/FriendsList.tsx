// FriendsList.tsx

import { RouterLink } from "@Components/navigation/routerLink";
import { GET_ERROR_LIST } from "@Utils/getResponseError";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box, Avatar, Typography, CircularProgress, Button, Grid, Skeleton, Alert } from "@mui/material";

import { useInfiniteGetFriendsQuery, UserDetail } from "../../../../shared";

interface FriendsListProps {
	friendOf: string,
}

const FriendsList: React.FC<FriendsListProps> = ({ friendOf }) => {
	const {
		data: friendsData,
		isLoading: friendsLoading,
		isError: friendsError,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteGetFriendsQuery(
		{ page: 0, limit: 0, friendOf },
		{
			initialPageParam: { page: 1, limit: 10 },
			getNextPageParam: (lastPage) => {
				const currentPage = lastPage?.getUsers?.page ?? 1;
				const limit = lastPage?.getUsers?.limit ?? 10;
				const total = lastPage?.getUsers?.total ?? 0;
				if (currentPage * limit < total) {
					return { page: currentPage + 1, limit };
				}

				return undefined;
			},
		},
	);

	const allFriends: UserDetail[] = friendsData?.pages.flatMap((page) => page.getUsers.items ?? []) ?? [];
	const totalFriends: number = friendsData?.pages[0]?.getUsers?.total ?? allFriends.length;

	return (
		<Box>
			<Typography variant='h6' gutterBottom>
				Friends ({totalFriends})
			</Typography>

			{friendsLoading && allFriends.length === 0 ? (
				<Grid container spacing={2}>
					{Array.from(new Array(5)).map((_, index) => (
						<Grid item xs={6} sm={4} md={3} key={index}>
							<Box display='flex' alignItems='center'>
								<Skeleton variant='circular' width={64} height={64} />
								<Box ml={2} width='100%'>
									<Skeleton variant='text' width='80%' />
								</Box>
							</Box>
						</Grid>
					))}
				</Grid>
			) : friendsError ? (
				GET_ERROR_LIST(error).map((errMsg: string, index: number) => (
					<Alert key={index} severity='error' sx={{ marginTop: "5px" }}>
						{errMsg}
					</Alert>
				))
			) : allFriends.length > 0 ? (
				<>
					<Grid container spacing={2}>
						{allFriends.map((friend: UserDetail) => (
							<Grid item xs={6} sm={4} md={3} key={friend.id}>
								<Box
									component={RouterLink}
									to={`/profile/${friend.id}`}
									sx={{
										textDecoration: "none",
										color: "inherit",
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										p: 2,
										borderRadius: 2,
										transition: "background-color 0.3s",
										"&:hover": {
											bgcolor: "action.hover",
										},
									}}
								>
									<Avatar
										src={friend.profilePictureUrl || undefined}
										alt={friend.username || "Friend"}
										sx={{ width: 64, height: 64, mb: 1 }}
									/>
									<Typography variant='subtitle2' noWrap>
										{friend.username}
									</Typography>
								</Box>
							</Grid>
						))}
					</Grid>

					{hasNextPage && (
						<Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
							<Button
								onClick={() => fetchNextPage()}
								disabled={!hasNextPage || isFetchingNextPage}
								variant='contained'
								size='small'
								endIcon={!isFetchingNextPage && <ArrowDownwardIcon />}
								sx={{
									minWidth: "auto",
									px: 2,
									py: 1,
									fontSize: "0.875rem",
									borderRadius: "20px",
									textTransform: "none",
								}}
								aria-label='Load more friends'
							>
								{isFetchingNextPage ? <CircularProgress size={16} color='inherit' /> : "Load More"}
							</Button>
						</Box>
					)}

					{isFetchingNextPage && allFriends.length > 0 && (
						<Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
							<CircularProgress />
						</Box>
					)}
				</>
			) : (
				<Alert severity='info' sx={{ marginTop: "5px" }}>
					No friends yet.
				</Alert>
			)}
		</Box>
	);
};

export default FriendsList;
