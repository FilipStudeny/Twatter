import GenericResponse from "@Utils/Http/GenericResponse.type";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SignInResponse extends GenericResponse {
	@Field(() => String)
	public token: string;

	constructor(token: string) {
		super("Sign-in successful", SignInResponse.name); // Provide the required arguments
		this.token = token;
	}
}
