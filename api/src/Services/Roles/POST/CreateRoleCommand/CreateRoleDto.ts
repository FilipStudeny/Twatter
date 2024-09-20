import { IsNotEmpty, IsString } from "class-validator";

export default class CreateRoleDto {
	@IsString()
	@IsNotEmpty()
	name: string;
}
