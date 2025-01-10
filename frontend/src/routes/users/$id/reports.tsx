import ReportCard from "@Components/report/ReportCard";
import { GET_ERROR_LIST } from "@Utils/getResponseError";
import GavelIcon from "@mui/icons-material/Gavel";
import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Container,
	Divider,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

import { useInfiniteScroll } from "hooks/infiniteScroll";

import { useInfiniteGetReportsQuery, ReportDetail } from "../../../../../shared";

export const Route = createFileRoute("/users/$id/reports")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();

	const {
		data,
		isLoading,
		isError,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteGetReportsQuery(
		{ userId: id, page: 0, limit: 0 },
		{
			initialPageParam: { page: 1, limit: 5 },
			getNextPageParam: (lastPage) => {
				const currentPage = lastPage?.GetReports?.page ?? 1;
				const limit = lastPage?.GetReports?.limit ?? 5;
				const total = lastPage?.GetReports?.total ?? 0;

				if (currentPage * limit < total) {
					return { page: currentPage + 1, limit };
				}

				return undefined;
			},
		},
	);

	const { sentinelRef } = useInfiniteScroll(
		Boolean(hasNextPage),
		isFetchingNextPage,
		fetchNextPage,
	);

	const allReports: ReportDetail[] =
    data?.pages?.flatMap((page) => page?.GetReports?.items ?? []) ?? [];

	if (isLoading) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" height="80vh">
				<CircularProgress />
			</Box>
		);
	}

	if (isError && error) {
		return (
			<Container sx={{ mt: 4 }}>
				{GET_ERROR_LIST(error).map((errMsg: string, index: number) => (
					<Alert key={index} severity="error" sx={{ mb: 1 }}>
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
				<Box display="flex" alignItems="center">
					<Typography
						variant="h5"
						fontWeight="bold"
						sx={{ letterSpacing: 1, color: "primary.main" }}
					>
						Reports
					</Typography>
					<GavelIcon sx={{ fontSize: 28, ml: 1, color: "primary.main" }} />
				</Box>

				<Divider sx={{ my: 2 }} />

				{allReports.length === 0 ? (
					<Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
						No reports found.
					</Typography>
				) : (
					<Stack spacing={3}>
						{allReports.map((report) => (
							<ReportCard key={report.id} report={report} />
						))}
					</Stack>
				)}
			</Paper>

			{hasNextPage && (
				<Box textAlign="center" mt="auto">
					<Button
						variant="contained"
						onClick={() => fetchNextPage()}
						disabled={isFetchingNextPage}
						sx={{ py: 1.2, px: 4, textTransform: "none" }}
					>
						{isFetchingNextPage ? "Loading..." : "Load More"}
					</Button>
				</Box>
			)}

			<Box ref={sentinelRef} height="1px" />
		</Container>
	);
}

export default RouteComponent;
