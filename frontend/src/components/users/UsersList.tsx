import PeopleIcon from "@mui/icons-material/People";
import { Box, Grid, Typography, CircularProgress, Button } from "@mui/material";
import React, { memo } from "react";

import { UsersListItem } from "./UsersListItem";
import { UserDetail } from "../../../../shared";

export function EmptyState() {
	return (
		<Box
			sx={{
				py: 8,
				textAlign: "center",
				background: "linear-gradient(135deg, #f5f7fa 0%, #f8faff 100%)",
				borderRadius: 2,
			}}
		>
			<PeopleIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
			<Typography variant='h6' color='text.secondary'>
				No users available at the moment
			</Typography>
			<Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
				Check back later for updates
			</Typography>
		</Box>
	);
}

export function LoadingState() {
	return (
		<Box display='flex' justifyContent='center' alignItems='center' height='80vh' flexDirection='column' gap={2}>
			<CircularProgress size={40} />
			<Typography variant='body2' color='text.secondary'>
				Loading users...
			</Typography>
		</Box>
	);
}

interface LoadMoreProps {
	onClick: ()=> void,
	isLoading: boolean,
}
export function LoadMoreButton({ onClick, isLoading }: LoadMoreProps) {
	return (
		<Box
			sx={{
				mt: 6,
				textAlign: "center",
				position: "relative",
				"&::before": {
					content: "\"\"",
					position: "absolute",
					top: "50%",
					left: 0,
					right: 0,
					height: "1px",
					background: (theme) => theme.palette.divider,
					zIndex: 0,
				},
			}}
		>
			<Button
				variant='contained'
				onClick={onClick}
				disabled={isLoading}
				sx={{
					py: 1.5,
					px: 4,
					borderRadius: 3,
					textTransform: "none",
					fontWeight: 600,
					position: "relative",
					background: "linear-gradient(45deg, #1976d2, #42a5f5)",
					boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
					"&:hover": {
						background: "linear-gradient(45deg, #1565c0, #1976d2)",
						boxShadow: "0 6px 16px rgba(25, 118, 210, 0.3)",
					},
				}}
			>
				{isLoading ? (
					<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
						<CircularProgress size={20} color='inherit' />
						<span>Loading...</span>
					</Box>
				) : (
					"Load More Users"
				)}
			</Button>
		</Box>
	);
}

export interface UsersListProps {
	isLoading: boolean,
	isError: boolean,
	allUsers: UserDetail[],
	hasNextPage?: boolean,
	isFetchingNextPage: boolean,
	fetchNextPage: ()=> void,
	sentinelRef: React.RefObject<HTMLDivElement>,
}

export const UsersList = memo(({
	allUsers,
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
	sentinelRef,
	isLoading,
}: UsersListProps) => {
	if (isLoading) {
		return <LoadingState />;
	}

	if (!allUsers.length) {
		return (
			<Box
				sx={{
					py: 8,
					textAlign: "center",
					background: "linear-gradient(135deg, #f5f7fa 0%, #f8faff 100%)",
					borderRadius: 2,
				}}
			>
				<PeopleIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
				<Typography variant='h6' color='text.secondary'>
					No users available at the moment
				</Typography>
				<Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
					Check back later for updates
				</Typography>
			</Box>
		);
	}

	return (
		<>
			<Grid container spacing={3}>
				{allUsers.map((user) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
						<UsersListItem user={user} />
					</Grid>
				))}
			</Grid>

			{hasNextPage && <LoadMoreButton onClick={fetchNextPage} isLoading={isFetchingNextPage} />}

			<Box ref={sentinelRef} height='1px' />
		</>
	);
});
