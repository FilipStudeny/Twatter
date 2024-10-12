import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

@InputType()
export class CreatePostDto {
	@Field()
	@IsString()
	@IsNotEmpty()
	content: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsUUID()
	interestId?: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsUUID()
	groupId?: string;
}
