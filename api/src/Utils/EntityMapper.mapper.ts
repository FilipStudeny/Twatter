import { CreateAdminDto } from "@Services/Admin/Mutations/CreateAdmin/CreateAdmin.dto";
import CommentDto from "@Services/Comment/Shared/Comment.dto";
import CreateUserDto from "@Services/User/Mutations/CreateUser/CreateUserDto.dto";
import { PostDetail } from "@Shared/Response/PostDetail";
import UserListItemDto from "@Shared/Response/UserDetail";
import { Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";

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
		};
	}
}
