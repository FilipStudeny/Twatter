import { Card, CardHeader, Skeleton, CardContent, Box, Stack } from "@mui/material";

export const PostSkeleton = () => {
	return (
		<Card
			elevation={2}
			sx={{
				borderRadius: 2,
				height: "100%",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<CardHeader
				avatar={<Skeleton animation='wave' variant='circular' width={40} height={40} />}
				title={<Skeleton animation='wave' height={24} width='40%' style={{ marginBottom: 6 }} />}
				subheader={<Skeleton animation='wave' height={20} width='30%' />}
				sx={{ pb: 1 }}
			/>

			<CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
				<Box sx={{ mb: 2 }}>
					<Skeleton animation='wave' height={20} style={{ marginBottom: 6 }} />
					<Skeleton animation='wave' height={20} width='80%' />
				</Box>

				<Skeleton
					animation='wave'
					variant='rectangular'
					sx={{
						width: "100%",
						borderRadius: 2,
						aspectRatio: "16/9",
						mb: 2,
					}}
				/>

				<Stack direction='row' spacing={1} sx={{ mb: 2, flexWrap: "wrap", gap: 0.5 }}>
					{[1, 2, 3].map((i) => (
						<Skeleton key={i} animation='wave' height={28} width={80} sx={{ borderRadius: 2 }} />
					))}
				</Stack>

				<Stack direction='row' spacing={2} sx={{ flexWrap: "wrap", gap: 2 }}>
					{[1, 2, 3].map((i) => (
						<Skeleton key={i} animation='wave' height={28} width={100} sx={{ borderRadius: 2 }} />
					))}
				</Stack>
			</CardContent>
		</Card>
	);
};
