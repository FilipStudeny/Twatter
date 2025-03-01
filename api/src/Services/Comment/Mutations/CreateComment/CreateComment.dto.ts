import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export default class CreateCommentDto {
	@Field(() => String)
	@IsNotEmpty()
	@IsString()
	postId: string;

	@Field(() => String)
	@IsNotEmpty()
	@IsString()
	content: string;
}
