import { Match } from "@Utils/MatchValidator";
import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsStrongPassword, MinLength, IsEmail } from "class-validator";

@InputType()
export class ResetPasswordInput {
	@Field(() => String)
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	token: string;

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
	newPassword: string;

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	@Match<ResetPasswordInput>("newPassword")
	repeatPassword: string;
}
