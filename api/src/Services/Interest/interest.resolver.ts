import { UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Args, Info, Int, Query, Resolver } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";
import * as graphqlFields from "graphql-fields";
import { Public, RouterGuard } from "src/Guards/RouteGuard.guard";

import { GetInterestsListQuery } from "./Queries/GetInterestsList/GetInterestsListQuery";
import PaginatedInterestsListResponse from "./Queries/GetInterestsList/PaginatedInterestsListResponse";

@Resolver()
@UseGuards(RouterGuard)
export default class InterestResolver {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	// eslint-disable-next-line class-methods-use-this
	@Query(() => String)
	hello(): string {
		return "Hello, World!";
	}

	@Query(() => PaginatedInterestsListResponse)
	@Public()
	async GetInterests(
		@Args("page", { type: () => Int, defaultValue: 1 }) page: number,
		@Args("limit", { type: () => Int, defaultValue: 10 }) limit: number,
		@Args("interestId", { type: () => String, nullable: true }) interestId: string,
		@Info() info: GraphQLResolveInfo,
	) {
		const fields = graphqlFields(info);
		return this.queryBus.execute(new GetInterestsListQuery(page, limit, fields.items, interestId));
	}
}
