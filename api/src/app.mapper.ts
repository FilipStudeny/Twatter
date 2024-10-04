import User from "@Models/User.entity";
import UserListItemDto from "@Services/user/Queries/GetUsers/UserListItem.dto";
import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
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
			createMap(
				mapper,
				User,
				UserListItemDto,
				forMember(
					(dto) => dto.id,
					mapFrom((entity) => entity.id),
				),
				forMember(
					(dto) => dto.email,
					mapFrom((entity) => entity.email),
				),
				forMember(
					(dto) => dto.firstName,
					mapFrom((entity) => entity.firstName),
				),
				forMember(
					(dto) => dto.lastName,
					mapFrom((entity) => entity.lastName),
				),
			);
		};
	}
}
