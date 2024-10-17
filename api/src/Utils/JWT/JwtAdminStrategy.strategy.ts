import { Administrator } from "@Models/Administration/Administrator";
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectEntityManager } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EntityManager } from "typeorm";

import JwtPayload from "./JwtPayload.interface";

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, "admin-jwt") {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		private readonly configService: ConfigService,
	) {
		super({
			secretOrKey: configService.get<string>("ADMIN_JWT_SECRET"),
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
		});
	}

	async validate(payload: JwtPayload): Promise<JwtPayload> {
		const { id, adminRole } = payload;

		// Retrieve administrator from the database
		const adminUser = await this.entityManager.findOne(Administrator, { where: { id } });
		if (!adminUser) {
			throw new NotFoundException("Administrator not found");
		}

		// Check if the role in the token matches the role in the database
		if (adminUser.adminRole !== adminRole) {
			throw new UnauthorizedException("Invalid administrator role");
		}

		return payload;
	}
}
