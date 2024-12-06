import { User } from "@Models/User";
import { Match } from "@Utils/MatchValidator";
import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsStrongPassword, MinLength, IsEmail } from "class-validator";

@InputType()
export default class SignUpUserData {
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
	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	})
	@MinLength(5)
	password: string;

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	@Match<SignUpUserData>("password")
	repeatPassword: string;

	@Field(() => String)
	@IsEmail()
	@IsNotEmpty()
	email: string;

	static createMap(mapper: Mapper): void {
		createMap(
			mapper,
			SignUpUserData,
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
