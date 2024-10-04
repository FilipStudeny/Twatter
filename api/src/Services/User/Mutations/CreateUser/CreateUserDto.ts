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
	@IsEmail()
	@IsNotEmpty()
	email: string;
}
