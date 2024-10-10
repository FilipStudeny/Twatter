enum ActionType {
	/**
	 * A user was added to a group or room.
	 */
	USER_ADDED,

	/**
	 * A user was removed from a group or room.
	 */
	USER_REMOVED,

	/**
	 * A new group was created.
	 */
	GROUP_CREATED,

	/**
	 * An existing group was updated (e.g., name, settings).
	 */
	GROUP_UPDATED,

	/**
	 * A group was deleted.
	 */
	GROUP_DELETED,

	/**
	 * A new room was created.
	 */
	ROOM_CREATED,

	/**
	 * An existing room was updated (e.g., name, settings).
	 */
	ROOM_UPDATED,

	/**
	 * A room was deleted.
	 */
	ROOM_DELETED,

	/**
	 * A message was sent in a room or group chat.
	 */
	MESSAGE_SENT,

	/**
	 * A message was deleted from a room or group chat.
	 */
	MESSAGE_DELETED,

	/**
	 * A user was promoted (e.g., given a higher role in a group or room).
	 */
	USER_PROMOTED,

	/**
	 * A user was demoted (e.g., given a lower role in a group or room).
	 */
	USER_DEMOTED,

	/**
	 * A user joined a room.
	 */
	USER_JOINED_ROOM,

	/**
	 * A user left a room.
	 */
	USER_LEFT_ROOM,

	/**
	 * A user joined a group.
	 */
	USER_JOINED_GROUP,

	/**
	 * A user left a group.
	 */
	USER_LEFT_GROUP,

	/**
	 * A file was uploaded to a group or room.
	 */
	FILE_UPLOADED,

	/**
	 * A file was deleted from a group or room.
	 */
	FILE_DELETED,

	/**
	 * Permissions for a user, group, or room were updated.
	 */
	PERMISSIONS_UPDATED,
}

export default ActionType;
