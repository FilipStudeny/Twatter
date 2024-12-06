import { Group } from "@Models/Group";
import { Interest } from "@Models/Interest";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import { GetInterestsListQueryHandler } from "./Queries/GetInterestsList/GetInterestsListQuery";
import InterestResolver from "./interest.resolver";

@Module({
	imports: [
		CqrsModule,
		ConfigModule,
		PassportModule.register({
			defaultStrategy: "jwt",
		}),
		TypeOrmModule.forFeature([Interest, Group]),
	],
	providers: [InterestResolver, GetInterestsListQueryHandler],
})
export class InterestModule {}
