import { Stack, Box, Skeleton, Paper } from "@mui/material";

export const LoadingSkeleton = () => {
	return (
		<Stack spacing={4}>
			{/* Title Skeleton */}
			<Box
				sx={{
					backgroundColor: "white",
					p: 4,
					borderRadius: 2,
				}}
			>
				<Skeleton variant='text' width='40%' height={40} />
			</Box>

			{/* Color Settings Skeleton */}
			<Paper elevation={1} sx={{ p: 4, borderRadius: 3 }}>
				<Skeleton variant='text' width='30%' height={30} sx={{ mb: 2 }} />
				<Skeleton variant='text' width='70%' height={20} sx={{ mb: 2 }} />
				<Skeleton variant='rectangular' height={160} sx={{ borderRadius: 2, mb: 3 }} />

				{/* Color pickers and angle */}
				<Stack direction='row' spacing={4} justifyContent='space-between'>
					<Box flex={1}>
						<Skeleton variant='text' width='60%' height={20} sx={{ mb: 2 }} />
						<Skeleton variant='rectangular' height={30} width={180} />
					</Box>
					<Box flex={1} display='flex' flexDirection='column' alignItems='center'>
						<Skeleton variant='text' width={120} height={20} sx={{ mb: 2 }} />
						<Skeleton variant='circular' width={100} height={100} />
					</Box>
					<Box flex={1}>
						<Skeleton variant='text' width='60%' height={20} sx={{ mb: 2 }} />
						<Skeleton variant='rectangular' height={30} width={180} />
					</Box>
				</Stack>
			</Paper>

			{/* Visibility Settings Skeleton */}
			<Paper elevation={1} sx={{ p: 4, borderRadius: 3 }}>
				<Skeleton variant='text' width='30%' height={30} sx={{ mb: 2 }} />
				<Skeleton variant='text' width='70%' height={20} sx={{ mb: 2 }} />

				{/* Radio placeholders */}
				<Stack spacing={2}>
					<Skeleton variant='text' width='50%' height={20} />
					<Skeleton variant='text' width='50%' height={20} />
					<Skeleton variant='text' width='50%' height={20} />
				</Stack>
			</Paper>

			{/* Save Button Skeleton */}
			<Paper elevation={1} sx={{ p: 3, borderRadius: 3 }}>
				<Box display='flex' justifyContent='flex-end'>
					<Skeleton variant='rectangular' height={40} width={120} />
				</Box>
			</Paper>
		</Stack>
	);
};
