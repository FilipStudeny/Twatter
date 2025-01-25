import ProfileVisibility from "@Models/Enums/ProfileVisibility";
import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsEnum, IsHexColor, IsNotEmpty, IsOptional } from "class-validator";

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
	@IsOptional()
	profileBackgroundLightAngle?: number;

	@Field(() => ProfileVisibility, { nullable: true })
	@IsEnum(ProfileVisibility)
	@IsNotEmpty()
	profileVisibility?: ProfileVisibility;

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
