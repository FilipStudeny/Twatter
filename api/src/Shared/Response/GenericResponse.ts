import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class GenericResponse {
	@Field(() => String, { nullable: true })
	message?: string;

	@Field(() => Boolean, { nullable: true })
	result: boolean;

	@Field(() => Boolean, { nullable: true })
	currentUserIsReceiver: boolean;

	constructor(message?: string, result?: boolean, currentUserIsReceiver?: boolean) {
		this.message = message;
		this.result = result;
		this.currentUserIsReceiver = currentUserIsReceiver;
	}
}
