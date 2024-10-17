// CreateGroupInput.ts
import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsUUID } from "class-validator";

@InputType()
export class CreateGroupDto {
	@Field()
	@IsNotEmpty()
	name: string;

	@Field()
	@IsUUID()
	interestId: string;
}
