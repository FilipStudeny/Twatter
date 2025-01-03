import { ArrowDownward as ArrowDownwardIcon, Close as CloseIcon } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Drawer, Box, List, Button, Typography, Toolbar, Grid, Skeleton, Alert, CircularProgress } from "@mui/material";
import React, { useState } from "react";

import { FriendItem } from "./FriendItem";
import { Search, SearchIconWrapper, StyledInputBase } from "./styles";
import { useInfiniteGetFriendsQuery, UserDetail } from "../../../../../shared";

interface RightSidebarProps {
	open: boolean,
	drawerWidth: number,
	onClose: ()=> void,
	friendOf: string,
	lgUp: boolean,
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ open, drawerWidth, onClose, friendOf, lgUp }) => {
	const [searchTerm, setSearchTerm] = useState("");

	// Fetch friends
	const {
		data: friendsData,
		isLoading: friendsLoading,
		isError: friendsError,
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

				return currentPage * limit < total ? { page: currentPage + 1, limit } : undefined;
			},
		},
	);

	const allFriends: UserDetail[] = friendsData?.pages.flatMap((page) => page.getUsers.items ?? []) ?? [];
	const filteredFriends = allFriends.filter((friend) =>
		friend?.username?.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<Drawer
			variant={lgUp ? "persistent" : "temporary"}
			open={open}
			onClose={onClose}
			anchor='right'
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
					boxSizing: "border-box",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				},
			}}
		>
			<Toolbar>
				<Typography variant='h6'>Friends</Typography>
			</Toolbar>
			<Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
				<Box sx={{ p: 2 }}>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder='Search Friends…'
							inputProps={{ "aria-label": "search friends" }}
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</Search>
				</Box>
				<Box sx={{ overflow: "auto", p: 2, flexGrow: 1 }}>
					{friendsLoading && !filteredFriends.length ? (
						<Grid container spacing={2}>
							{Array.from(new Array(5)).map((_, index) => (
								<Grid item xs={12} key={index}>
									<Skeleton variant='rectangular' height={48} />
								</Grid>
							))}
						</Grid>
					) : friendsError ? (
						<Alert severity='error'>Failed to load friends.</Alert>
					) : filteredFriends.length > 0 ? (
						<List>
							{filteredFriends.map((friend) => (
								<FriendItem key={friend.id} friend={friend} />
							))}
						</List>
					) : (
						<Typography variant='body2' align='center'>
							No friends found.
						</Typography>
					)}
					{hasNextPage && (
						<Box sx={{ textAlign: "center", mt: 2 }}>
							<Button
								onClick={() => fetchNextPage()}
								disabled={isFetchingNextPage}
								variant='outlined'
								startIcon={!isFetchingNextPage && <ArrowDownwardIcon />}
							>
								{isFetchingNextPage ? <CircularProgress size={16} /> : "Load More"}
							</Button>
						</Box>
					)}
				</Box>
				<Box sx={{ p: 2 }}>
					<Button variant='outlined' color='primary' startIcon={<CloseIcon />} onClick={onClose} fullWidth>
						Close
					</Button>
				</Box>
			</Box>
		</Drawer>
	);
};
