import { DbResponse } from "@Shared/DbResponse";
import { Mapper, createMap, forMember, mapFrom } from "@automapper/core";
import { Field, ObjectType, Int } from "@nestjs/graphql";

@ObjectType()
export class InterestDetail {
	@Field(() => String, { nullable: true })
	id: string;

	@Field(() => String, { nullable: true })
	name: string;

	@Field(() => Int, { nullable: true })
	postsCount: number;

	@Field(() => Int, { nullable: true })
	groupsCount: number;

	static createMap(mapper: Mapper): void {
		createMap(
			mapper,
			DbResponse,
			InterestDetail,
			forMember(
				(destination) => destination.id,
				mapFrom((source) => source.interest_id),
			),
			forMember(
				(destination) => destination.name,
				mapFrom((source) => source.interest_name),
			),
			forMember(
				(destination) => destination.groupsCount,
				mapFrom((source) => parseInt(source.groups_count || "0", 10)),
			),
			forMember(
				(destination) => destination.postsCount,
				mapFrom((source) => parseInt(source.posts_count || "0", 10)),
			),
		);
	}
}
