import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsHexColor, IsOptional } from "class-validator";

@InputType()
export class UpdateUserConfigurationDto {
	@Field({ nullable: true })
	@IsHexColor()
	@IsOptional()
	profileBackgroundColor1?: string;

	@Field({ nullable: true })
	@IsHexColor()
	@IsOptional()
	profileBackgroundColor2?: string;

	@Field({ nullable: true })
	@IsBoolean()
	@IsOptional()
	friendRequest_Email_Notification?: boolean;

	@Field({ nullable: true })
	@IsBoolean()
	@IsOptional()
	friendRequest_App_Notification?: boolean;

	@Field({ nullable: true })
	@IsBoolean()
	@IsOptional()
	postReactedTo_Email_Notification?: boolean;

	@Field({ nullable: true })
	@IsBoolean()
	@IsOptional()
	postReactedTo_App_Notification?: boolean;

	@Field({ nullable: true })
	@IsBoolean()
	@IsOptional()
	commentReactedTo_Email_Notification?: boolean;

	@Field({ nullable: true })
	@IsBoolean()
	@IsOptional()
	commentReactedTo_App_Notification?: boolean;
}
