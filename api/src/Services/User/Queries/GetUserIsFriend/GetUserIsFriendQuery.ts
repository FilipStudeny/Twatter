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

		const authenticatedUser = await this.entityManager.findOne(User, {
			where: { id: authenticatedUserId },
			relations: ["friends"],
		});

		const isFriend = authenticatedUser?.friends.some((friend) => friend.id === userId) || false;
		return new GenericResponse("Friendship status retrieved", isFriend);
	}
}
