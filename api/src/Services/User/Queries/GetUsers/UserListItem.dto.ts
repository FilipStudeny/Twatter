import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class UserListItemDto {
	@Field()
	id?: string;

	@Field()
	email?: string;

	@Field()
	firstName?: string;

	@Field()
	lastName?: string;
}