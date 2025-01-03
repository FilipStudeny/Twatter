import { ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Divider, Tooltip } from "@mui/material";
import React from "react";

import { StyledBadge } from "./styles";
import { UserDetail } from "../../../../../shared";

interface FriendItemProps {
	friend: UserDetail,
}

export const FriendItem: React.FC<FriendItemProps> = ({ friend }) => {
	return (
		<>
			<Tooltip title={friend.username ?? "Unknown User"} arrow>
				<ListItem aria-label={friend.username ?? ""}>
					<ListItemAvatar>
						<StyledBadge
							status='online'
							overlap='circular'
							anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
							variant='dot'
							aria-label='online'
						>
							<Avatar src={friend.profilePictureUrl ?? ""} alt={friend.username ?? ""} />
						</StyledBadge>
					</ListItemAvatar>
					<ListItemText
						primary={
							<Typography variant='subtitle2' noWrap>
								{friend.username}
							</Typography>
						}
					/>
				</ListItem>
			</Tooltip>
			<Divider component='li' />
		</>
	);
};
