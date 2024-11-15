import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SignInResponse {
	@Field(() => String)
	public accessToken: string;

	@Field(() => String)
	public refreshToken: string;

	constructor(accessToken: string, refreshToken: string) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
	}
}
