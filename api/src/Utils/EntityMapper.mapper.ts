import { CreateAdminDto } from "@Services/Admin/Mutations/CreateAdmin/CreateAdmin.dto";
import CommentDto from "@Services/Comment/Shared/Comment.dto";
import CreateUserDto from "@Services/User/Mutations/CreateUser/CreateUserDto.dto";
import { PostDetail } from "@Shared/Response/PostDetail";
import UserListItemDto from "@Shared/Response/UserDetail";
import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { DbResponse } from "@Shared/DbResponse";
import { InterestDetail } from "@Shared/Response/InterestDetail";
import { ReactionsCount } from "@Shared/Response/ReactionsCount";
import { CommentDetail } from "@Shared/Response/CommentDetail";
import { GroupDetail } from "@Shared/Response/GroupDetail";

@Injectable()
export default class EntityMapper extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper);
	}

	// eslint-disable-next-line class-methods-use-this
	override get profile() {
		return (mapper: Mapper) => {
			CreateUserDto.createMap(mapper);
			UserListItemDto.createMap(mapper);
			CommentDto.createMap(mapper);
			CreateAdminDto.createMap(mapper);
			PostDetail.createMap(mapper);
			createMap(
				mapper,
				DbResponse,
				PostDetail,
				// Map basic fields
				forMember(
					(destination) => destination.id,
					mapFrom((source) => source.post_id),
				),
				forMember(
					(destination) => destination.content,
					mapFrom((source) => source.post_content),
				),
				forMember(
					(destination) => destination.createdAt,
					mapFrom((source) => source.post_createdAt),
				),
				forMember(
					(destination) => destination.updatedAt,
					mapFrom((source) => source.post_updatedAt),
				),
				forMember(
					(destination) => destination.isPinned,
					mapFrom((source) => !!source.post_pinnedCommentId),
				),

				// Map creator
				forMember(
					(destination) => destination.creator,
					mapFrom(
						(source) =>
							({
								id: source.creator_id,
								username: source.creator_username,
								firstName: source.creator_firstName,
								lastName: source.creator_lastName,
							}) as UserListItemDto,
					),
				),

				// Map interest
				forMember(
					(destination) => destination.interest,
					mapFrom((source) =>
						source.interest_id
							? ({
									id: source.interest_id,
									name: source.interest_name,
								} as InterestDetail)
							: undefined,
					),
				),

				// Map reactions
				forMember(
					(destination) => destination.reactions,
					mapFrom(
						(source) =>
							({
								like: parseInt(source.like_count || "0", 10),
								dislike: parseInt(source.dislike_count || "0", 10),
								smile: parseInt(source.smile_count || "0", 10),
								angry: parseInt(source.angry_count || "0", 10),
								sad: parseInt(source.sad_count || "0", 10),
								love: parseInt(source.love_count || "0", 10),
							}) as ReactionsCount,
					),
				),

				// Map pinned comment
				forMember(
					(destination) => destination.pinnedComment,
					mapFrom((source) =>
						source.pinnedComment_id
							? ({
									id: source.pinnedComment_id,
									content: source.pinnedComment_content,
									creator: {
										id: source.pinnedComment_creator_id,
										username: source.pinnedComment_creator_username,
									} as UserListItemDto,
								} as CommentDetail)
							: undefined,
					),
				),

				// Map group
				forMember(
					(destination) => destination.group,
					mapFrom((source) =>
						source.group_id
							? ({
									id: source.group_id,
									name: source.group_name,
								} as GroupDetail)
							: undefined,
					),
				),

				// Map counts
				forMember(
					(destination) => destination.commentsCount,
					mapFrom((source) => parseInt(source.comments_count || "0", 10)),
				),
				forMember(
					(destination) => destination.reportsCount,
					mapFrom((source) => parseInt(source.reports_count || "0", 10)),
				),
				forMember(
					(destination) => destination.strikesCount,
					mapFrom((source) => parseInt(source.strikes_count || "0", 10)),
				),
			);
		};
	}
}