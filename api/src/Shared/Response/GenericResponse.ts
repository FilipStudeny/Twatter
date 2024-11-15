import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class GenericResponse {
	@Field(() => String, { nullable: true })
	message?: string;

	constructor(message?: string) {
		this.message = message;
	}
}
