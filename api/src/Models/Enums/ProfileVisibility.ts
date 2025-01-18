import { registerEnumType } from "@nestjs/graphql";

export enum ProfileVisibility {
	PUBLIC,
	ONLY_FRIENDS,
	PRIVATE,
}

registerEnumType(ProfileVisibility, {
	name: "ProfileVisibility",
	description: "Different types of profile visibility",
});

export default ProfileVisibility;
