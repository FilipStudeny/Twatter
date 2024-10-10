import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class GenericResponse {
	@Field(() => String, { nullable: true })
	message?: string;

	@Field(() => String, { nullable: true })
	action?: string;

	constructor(message?: string, action?: string) {
		this.message = message;
		this.action = action.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toUpperCase();
	}
}
