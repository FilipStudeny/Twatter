import { User } from "@Models/User";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectEntityManager } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EntityManager } from "typeorm";

import JwtPayload from "./JwtPayload.interface";

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectEntityManager() private readonly entityManager: EntityManager,
		private readonly configService: ConfigService,
	) {
		super({
			secretOrKey: configService.get<string>("JWT_SECRET"),
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
		});
	}

	async validate(payload: JwtPayload): Promise<User> {
		console.log("Validating payload:", payload);
		const { id } = payload;

		const user: User = await this.entityManager.findOne(User, { where: { id } });

		if (!user) {
			throw new NotFoundException();
		}

		return user;
	}
}
