import ReactionTargetType from "@Models/Enums/ReactionTarget";
import ReactionType from "@Models/Enums/ReactionType";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateOrUpdateReactionDto {
	@Field(() => ReactionType)
	reactionType: ReactionType;

	@Field(() => String)
	targetId: string;

	@Field(() => ReactionTargetType)
	targetType: ReactionTargetType;
}
