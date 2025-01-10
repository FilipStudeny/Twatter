import { GET_ERROR_LIST } from "@Utils/getResponseError";
import { Box, Button, CircularProgress, Alert, Stack } from "@mui/material";
import React from "react";

import { useInfiniteScroll } from "hooks/infiniteScroll";

import { ReportDetail, useInfiniteGetReportsQuery } from "../../../../../shared";
import ReportCard from "./ReportCard";

interface FilledReportsListProps {
	userId: string,
}

const FilledReportsList: React.FC<FilledReportsListProps> = ({ userId }) => {
	const {
		data: reportsPages,
		isLoading: isLoadingReports,
		isError: reportsFetchFailed,
		error: reportsError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteGetReportsQuery(
		{ page: 0, limit: 0, userId },
		{
			initialPageParam: { page: 1, limit: 2, userId },
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

	const { sentinelRef } = useInfiniteScroll(Boolean(hasNextPage), isFetchingNextPage, fetchNextPage);

	const allReports: ReportDetail[] = reportsPages?.pages.flatMap((page) => page?.GetReports.items ?? []) ?? [];

	return (
		<Box sx={{ mt: 3 }}>
			{/* Loading State */}
			{isLoadingReports && (
				<Box display='flex' justifyContent='center' mb={2}>
					<CircularProgress />
				</Box>
			)}

			{/* Error State */}
			{reportsFetchFailed && (
				<Alert severity='error' sx={{ mb: 2 }}>
					{GET_ERROR_LIST(reportsError).map((errMsg, idx) => (
						<div key={idx}>{errMsg}</div>
					))}
				</Alert>
			)}

			{/* No Data State */}
			{!isLoadingReports && !reportsFetchFailed && allReports.length === 0 && (
				<Alert severity='info' sx={{ mb: 2 }}>
					No reports available.
				</Alert>
			)}

			{/* Report List */}
			<Stack spacing={2}>
				{allReports.map((report: ReportDetail) => (
					<ReportCard key={report.id} report={report} />
				))}
			</Stack>

			{/* Load More Button */}
			{hasNextPage && (
				<>
					<Box mt={2} textAlign='center'>
						<Button
							variant='outlined'
							onClick={() => fetchNextPage()}
							disabled={isFetchingNextPage}
							aria-label={isFetchingNextPage ? "Loading more reports" : "Load more reports"}
						>
							{isFetchingNextPage ? "Loading..." : "Load More"}
						</Button>
					</Box>
					<Box ref={sentinelRef} height='1px' />
				</>
			)}

			{/* Fetching More State */}
			{isFetchingNextPage && (
				<Box display='flex' justifyContent='center' mt={2}>
					<CircularProgress />
				</Box>
			)}
		</Box>
	);
};

export default FilledReportsList;
