import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { ProfileVisibility } from "../../../../shared";

/**
 * Props:
 * - visibility: The user's profile visibility (numeric enum 0,1,2).
 * - isOwner: Whether the current viewer is the same user (the owner).
 * - isFriend: Whether the current viewer is a friend of this user.
 * - children: The normal profile content to display if allowed.
 */
type ProfileVisibilityOverlayProps = {
	visibility: ProfileVisibility,
	isOwner: boolean,
	isFriend: boolean,
	children: React.ReactNode,
};

export const ProfileVisibilityOverlay: React.FC<ProfileVisibilityOverlayProps> = ({
	visibility,
	isOwner,
	isFriend,
	children,
}) => {
	// If the user is the owner, always show the profile
	if (isOwner) {
		return <>{children}</>;
	}

	// If the profile is PRIVATE (enum = 2) and viewer is not the owner, block entirely
	if (visibility === ProfileVisibility.Private) {
		return <OverlayMessage title='This profile is private.' description='Only the user can view this profile.' />;
	}

	// If the profile is ONLY_FRIENDS (enum = 1) and the viewer is not a friend, block
	if (visibility === ProfileVisibility.OnlyFriends && !isFriend) {
		return (
			<OverlayMessage
				title='Friends-only profile.'
				description="Only this user's friends can view this profile."
			/>
		);
	}

	// Otherwise, the profile is public or the viewer is allowed => show content
	return <>{children}</>;
};

/**
 * A sub-component that displays a centered message instead of the content
 */
const OverlayMessage: React.FC<{ title: string, description?: string }> = ({ title, description }) => {
	return (
		<Paper
			elevation={0}
			sx={{
				minHeight: 400,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: (theme) => theme.palette.grey[100],
			}}
		>
			<Stack spacing={1} alignItems='center'>
				<Typography variant='h5' fontWeight='bold'>
					{title}
				</Typography>
				{description && (
					<Typography variant='body2' color='text.secondary'>
						{description}
					</Typography>
				)}
			</Stack>
		</Paper>
	);
};
