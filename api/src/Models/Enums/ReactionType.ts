import { registerEnumType } from "@nestjs/graphql";

enum ReactionType {
	LIKE = "like",
	DISLIKE = "dislike",
	SMILE = "smile",
	ANGRY = "angry",
	SAD = "sad",
	LOVE = "love",
}

registerEnumType(ReactionType, {
	name: "ReactionType",
	description: "Different types of reactions available",
});

export default ReactionType;
