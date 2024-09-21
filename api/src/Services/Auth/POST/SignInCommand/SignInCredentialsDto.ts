import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export default class SignInCredentialsDto {
	@ApiProperty({
		example: "StrongPassword123!",
		description: "Password for the user login",
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(5)
	password: string;

	@ApiProperty({
		example: "john.doe@example.com",
		description: "Email address for the user login",
	})
	@IsEmail()
	@IsNotEmpty()
	email: string;
}
