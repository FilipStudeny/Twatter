export class DbResponse {
	post_id: string;

	post_content: string;

	post_createdAt: string;

	post_updatedAt: string;

	post_pinnedCommentId: string | null;

	creator_id: string;

	creator_username: string;

	creator_firstName: string;

	creator_lastName: string;

	interest_id: string;

	interest_name: string;

	like_count: string;

	dislike_count: string;

	smile_count: string;

	angry_count: string;

	sad_count: string;

	love_count: string;

	comments_count: string;

	group_id: string | null;

	group_name: string | null;

	pinnedComment_id: string | null;

	pinnedComment_content: string | null;

	pinnedComment_creator_id: string | null;

	pinnedComment_creator_username: string | null;

	reports_count: string;

	strikes_count: string;

	total_count: string;
}
