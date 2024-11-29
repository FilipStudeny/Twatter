export class DbResponse {
	post_id: string;

	post_content: string;

	post_createdAt: Date;

	post_updatedAt: Date;

	post_pinnedCommentId: string;

	creator_id: string;

	creator_username: string;

	creator_firstName: string;

	creator_lastName: string;

	interest_id: string;

	interest_name: string;

	comments_count: string;

	group_id: string | null;

	group_name: string | null;

	pinnedComment_id: string;

	pinnedComment_creator_id: string;

	pinnedComment_creator_username: string;

	reports_count: string;

	strikes_count: string;

	total_count: string;

	like_count: string;

	dislike_count: string;

	smile_count: string;

	angry_count: string;

	sad_count: string;

	love_count: string;

	pinnedComment_content: string;
}
