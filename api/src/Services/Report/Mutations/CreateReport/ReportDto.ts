import ReportType from "@Models/Enums/ReportType";
import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

@InputType()
export class ReportDto {
	@Field(() => ReportType)
	@IsEnum(ReportType)
	@IsNotEmpty()
	reportType: ReportType;

	@Field()
	@IsString()
	@IsOptional()
	message: string;

	@Field({ nullable: true })
	@IsUUID()
	@IsOptional()
	reportedPostId?: string;

	@Field({ nullable: true })
	@IsUUID()
	@IsOptional()
	reportedCommentId?: string;

	@Field({ nullable: true })
	@IsUUID()
	@IsOptional()
	reportedUserId?: string;
}
