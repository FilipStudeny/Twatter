import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export default class CreateUserDto {
	@ApiProperty({
		example: "John",
		description: "First name of the user",
	})
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@ApiProperty({
		example: "Doe",
		description: "Last name of the user",
	})
	@IsString()
	@IsNotEmpty()
	lastName: string;

	@ApiProperty({
		example: "StrongPassword123!",
		description: "Password of the user",
	})
	@IsString()
	@IsNotEmpty()
	@IsStrongPassword()
	@MinLength(5)
	password: string;

	@ApiProperty({
		example: "john.doe@example.com",
		description: "Email address of the user",
	})
	@IsEmail()
	@IsNotEmpty()
	email: string;
}
