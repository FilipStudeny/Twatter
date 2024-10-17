import { registerEnumType } from "@nestjs/graphql";

enum ReactionTargetType {
	POST = "post",
	COMMENT = "comment",
}

registerEnumType(ReactionTargetType, {
	name: "ReactionTargetType",
	description: "Target type for the reaction, either POST or COMMENT",
});

export default ReactionTargetType;
