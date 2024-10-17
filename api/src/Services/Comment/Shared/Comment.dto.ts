import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { Comment } from "@Models/Comment";
import { Field, ID, ObjectType, GraphQLISODateTime } from "@nestjs/graphql";

@ObjectType()
export default class CommentDto {
	@Field(() => ID)
	id: string;

	@Field()
	content: string;

	@Field()
	creatorName: string;

	@Field(() => GraphQLISODateTime)
	createdAt: Date;

	static createMap(mapper: Mapper): void {
		createMap(
			mapper,
			Comment,
			CommentDto,
			forMember(
				(dto) => dto.id,
				mapFrom((entity) => entity.id),
			),

			forMember(
				(dto) => dto.content,
				mapFrom((entity) => entity.content),
			),

			forMember(
				(dto) => dto.createdAt,
				mapFrom((entity) => entity.createdAt),
			),

			forMember(
				(dto) => dto.creatorName,
				mapFrom((entity) => `${entity.creator.firstName} ${entity.creator.lastName}`),
			),
		);
	}
}
