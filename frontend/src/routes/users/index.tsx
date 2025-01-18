import { UsersList } from "@Components/users/UsersList";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import {
	Container,
	Paper,
	Box,
	Typography,
	Divider,
	TextField,
	CircularProgress,
	InputAdornment,
	alpha,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { useInfiniteScroll } from "hooks/infiniteScroll";

import { useInfiniteGetUsersListQuery } from "../../../../shared";

export const Route = createFileRoute("/users/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
		useInfiniteGetUsersListQuery(
			{ page: 0, limit: 0, search: searchTerm },
			{
				initialPageParam: { page: 1, limit: 12, search: searchTerm },
				getNextPageParam: (lastPage) => {
					const currentPage = lastPage?.getUsers?.page ?? 1;
					const limit = lastPage?.getUsers?.limit ?? 12;
					const total = lastPage?.getUsers?.total ?? 0;
					if (currentPage * limit < total) {
						return { page: currentPage + 1, limit, search: searchTerm };
					}

					return undefined;
				},
			},
		);

	const { sentinelRef } = useInfiniteScroll(Boolean(hasNextPage), isFetchingNextPage, fetchNextPage);

	const allUsers = useMemo(() => {
		return data?.pages?.flatMap((page) => page?.getUsers?.items ?? []) ?? [];
	}, [data]);

	return (
		<Container maxWidth='xl' sx={{ py: 5 }}>
			<Paper
				elevation={0}
				sx={{
					p: { xs: 3, sm: 4 },
					borderRadius: 3,
					background: "linear-gradient(145deg, #ffffff 0%, #f8faff 100%)",
					border: "1px solid",
					borderColor: "divider",
					boxShadow: (theme) => `0 0 20px ${alpha(theme.palette.primary.main, 0.08)}`,
				}}
			>
				<Box
					sx={{
						mb: 4,
						display: "flex",
						flexDirection: { xs: "column", sm: "row" },
						alignItems: { xs: "stretch", sm: "center" },
						gap: 3,
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 1.5,
							flex: "1 1 auto",
						}}
					>
						<Box
							sx={{
								background: (theme) => theme.palette.primary.main,
								borderRadius: 2,
								p: 1,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<PeopleIcon sx={{ fontSize: 24, color: "white" }} />
						</Box>
						<Typography
							variant='h5'
							sx={{
								fontWeight: 700,
								background: (theme) =>
									`linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
								backgroundClip: "text",
								WebkitBackgroundClip: "text",
								color: "transparent",
								letterSpacing: 0.5,
							}}
						>
							Users
						</Typography>
					</Box>

					<Box sx={{ flex: { sm: "0 1 300px" } }}>
						<TextField
							fullWidth
							variant='outlined'
							size='medium'
							placeholder='Search users...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							sx={{
								backgroundColor: "white",
								"& .MuiOutlinedInput-root": {
									borderRadius: 2,
									transition: "all 0.2s ease-in-out",
									"&:hover": {
										"& fieldset": {
											borderColor: "primary.main",
										},
									},
									"&.Mui-focused": {
										"& fieldset": {
											borderWidth: "1px",
										},
									},
								},
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<SearchIcon color='action' />
									</InputAdornment>
								),
								endAdornment: isFetching ? (
									<InputAdornment position='end'>
										<CircularProgress size={20} color='inherit' />
									</InputAdornment>
								) : null,
							}}
						/>
					</Box>
				</Box>

				<Divider
					sx={{
						mb: 4,
						borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
					}}
				/>

				<UsersList
					isLoading={isLoading}
					isError={isError}
					allUsers={allUsers}
					hasNextPage={hasNextPage}
					isFetchingNextPage={isFetchingNextPage}
					fetchNextPage={fetchNextPage}
					sentinelRef={sentinelRef}
				/>
			</Paper>
		</Container>
	);
}

export default RouteComponent;
