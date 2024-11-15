import { User } from "@Models/User";
import { Match } from "@Utils/MatchValidator";
import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsStrongPassword, MinLength, IsEmail } from "class-validator";

@InputType()
export default class CreateUserDto {
	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	lastName: string;

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	@IsStrongPassword()
	@MinLength(5)
	password: string;

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	@Match<CreateUserDto>("password")
	repeatPassword: string;

	@Field(() => String)
	@IsEmail()
	@IsNotEmpty()
	email: string;

	static createMap(mapper: Mapper): void {
		createMap(
			mapper,
			CreateUserDto,
			User,
			forMember(
				(user) => user.firstName,
				mapFrom((dto) => dto.firstName),
			),
			forMember(
				(user) => user.lastName,
				mapFrom((dto) => dto.lastName),
			),
			forMember(
				(user) => user.email,
				mapFrom((dto) => dto.email),
			),
		);
	}
}
