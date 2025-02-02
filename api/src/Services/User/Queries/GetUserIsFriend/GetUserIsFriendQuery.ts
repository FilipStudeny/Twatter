import { User } from "@Models/User";
import GenericResponse from "@Shared/Response/GenericResponse";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

export class GetUserIsFriendQuery {
	constructor(
		public readonly userId: string,
		public readonly authenticatedUserId: string,
	) {}
}

@QueryHandler(GetUserIsFriendQuery)
export class GetUserIsFriendQueryHandler implements IQueryHandler<GetUserIsFriendQuery> {
	constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

	async execute(query: GetUserIsFriendQuery): Promise<GenericResponse> {
		const { authenticatedUserId, userId } = query;

		const friendship = await this.entityManager
			.createQueryBuilder()
			.select("friend.id", "id")
			.from(User, "user")
			.leftJoin("user.friends", "friend")
			.where("user.id = :authenticatedUserId", { authenticatedUserId })
			.andWhere("friend.id = :userId", { userId })
			.getRawOne();

		const isFriend = !!friendship;

		return new GenericResponse(null, isFriend);
	}
}
