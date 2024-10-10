import { IsNotEmpty, IsString } from "class-validator";

export default class CreatePostDto {
	@IsNotEmpty()
	@IsString()
	title: string;

	@IsNotEmpty()
	@IsString()
	content: string;
}
