import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

@InputType()
export default class SignInCredentials {
	@Field()
	@IsString()
	@IsNotEmpty()
	@MinLength(5)
	password: string;

	@Field()
	@IsString()
	@IsNotEmpty()
	@MinLength(5)
	passwordRepeat: string;

	@Field()
	@IsEmail({}, { message: "Please provide a valid email address." })
	@IsNotEmpty({ message: "Email cannot be empty." })
	email: string;
}
