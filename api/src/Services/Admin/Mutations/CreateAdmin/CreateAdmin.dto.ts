import { Administrator } from "@Models/Administration/Administrator";
import AdminRole from "@Models/Enums/AdminRole";
import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from "class-validator";

@InputType()
export class CreateAdminDto {
	@Field()
	@IsNotEmpty()
	username: string;

	@Field()
	@IsEmail()
	email: string;

	@Field()
	@MinLength(6)
	password: string;

	@Field(() => AdminRole, { defaultValue: AdminRole.MODERATOR })
	@IsEnum(AdminRole)
	adminRole: AdminRole;

	static createMap(mapper: Mapper): void {
		createMap(
			mapper,
			CreateAdminDto,
			Administrator,
			forMember(
				(admin) => admin.username,
				mapFrom((dto) => dto.username),
			),
			forMember(
				(admin) => admin.email,
				mapFrom((dto) => dto.email),
			),
			forMember(
				(admin) => admin.adminRole,
				mapFrom((dto) => dto.adminRole),
			),
		);
	}
}
