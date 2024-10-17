import { User } from "@Models/User";
import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class UserListItemDto {
	@Field()
	id?: string;

	@Field()
	email?: string;

	@Field()
	firstName?: string;

	@Field()
	lastName?: string;

	@Field()
	username?: string;

	static createMap(mapper: Mapper): void {
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
			forMember(
				(dto) => dto.username,
				mapFrom((entity) => entity.username),
			),
		);
	}
}
