import { RouterLink } from "@Components/navigation/routerLink";
import { Box, Typography, Card, Avatar } from "@mui/material";
import { memo } from "react";

import { UserDetail } from "../../../../shared";

interface StatProps {
	label: string,
	value: number,
}
const Stat = ({ label, value }: StatProps) => (
	<Box sx={{ textAlign: "center" }}>
		<Typography variant='body2' fontWeight='medium'>
			{value.toLocaleString()}
		</Typography>
		<Typography variant='caption' color='text.secondary'>
			{label}
		</Typography>
	</Box>
);

interface UsersListItemProps {
	user: UserDetail,
}

export const UsersListItem = memo(({ user }: UsersListItemProps) => {
	const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
	const displayName = user.username?.trim() || fullName;

	return (
		<Card
			sx={{
				position: "relative",
				overflow: "visible",
				borderRadius: 3,
				boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
				transition: "all 0.3s ease",
				cursor: "pointer",
				"&:hover": {
					transform: "translateY(-4px)",
					boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
				},
			}}
		>
			<RouterLink to='/users/$id' params={{ id: user.id }} style={{ textDecoration: "none", color: "inherit" }}>
				<Box
					sx={{
						background: `linear-gradient(135deg, ${user.userConfiguration.profileBackgroundColor1} 0%, ${user.userConfiguration.profileBackgroundColor2} 100%)`,
						height: 80,
						borderTopLeftRadius: 8,
						borderTopRightRadius: 8,
						position: "relative",
						"&::after": {
							content: "\"\"",
							position: "absolute",
							bottom: 0,
							left: 0,
							right: 0,
							height: "40%",
							background: "linear-gradient(to top, rgba(0,0,0,0.2), transparent)",
						},
					}}
				/>
				<Avatar
					sx={{
						width: 64,
						height: 64,
						position: "absolute",
						top: 48,
						left: "50%",
						transform: "translateX(-50%)",
						border: "4px solid white",
						boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
						transition: "transform 0.3s ease",
						"&:hover": {
							transform: "translateX(-50%) scale(1.05)",
						},
					}}
					src={user.profilePictureUrl || ""}
					alt={fullName || "Unknown User"}
				/>
				<Box sx={{ pt: 5, pb: 2, px: 2, textAlign: "center" }}>
					<Typography
						variant='body1'
						fontWeight='500'
						noWrap
						sx={{
							textOverflow: "ellipsis",
							overflow: "hidden",
							display: "block",
							mb: 0.5,
						}}
						title={displayName}
					>
						{displayName}
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
								mb: 2,
							}}
							title={fullName}
						>
							{fullName}
						</Typography>
					)}

					<Box
						sx={{
							display: "flex",
							justifyContent: "space-around",
							pt: 2,
							borderTop: "1px solid",
							borderColor: "divider",
						}}
					>
						<Stat label='Posts' value={user.postsCount || 0} />
						<Stat label='Friends' value={user.friendsCount || 0} />
						<Stat label='Groups' value={user.joinedGroupsCount || 0} />
					</Box>
				</Box>
			</RouterLink>
		</Card>
	);
});
