// SignInResponse.ts
import GenericResponse from "@Utils/Http/GenericResponse.type";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SignInResponse extends GenericResponse {
	@Field(() => String)
	public accessToken: string;

	@Field(() => String)
	public refreshToken: string;

	constructor(accessToken: string, refreshToken: string) {
		super("Sign-in successful", SignInResponse.name);
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
	}
}
