import { Field, ObjectType } from "@nestjs/graphql";
import UserDetail from "./UserDetail";

@ObjectType()
export class SignInResponse {
	@Field(() => String)
	public accessToken: string;

	@Field(() => String)
	public refreshToken: string;

	@Field(() => UserDetail)
	public userData?: UserDetail;

	constructor(accessToken: string, refreshToken: string, userData?: UserDetail) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		this.userData = userData;
	}
}
