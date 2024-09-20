import { ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export default class CreateUserDTO {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsEmail()
	@IsString()
	email: string;

	@IsNotEmpty()
	@IsStrongPassword()
	@IsString()
	passwordHash: string;

	@IsArray()
	@ArrayNotEmpty()
	roleIds: number[];
}
