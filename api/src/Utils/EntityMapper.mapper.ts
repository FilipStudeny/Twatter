import { Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import CreateUserDto from "@Services/User/Mutations/CreateUser/CreateUserDto.dto";
import UserListItemDto from "@Services/User/Shared/UserListItem.dto";

@Injectable()
export default class EntityMapper extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper);
	}

	// eslint-disable-next-line class-methods-use-this
	override get profile() {
		return (mapper: Mapper) => {
			CreateUserDto.createMap(mapper), UserListItemDto.createMap(mapper);
		};
	}
}
