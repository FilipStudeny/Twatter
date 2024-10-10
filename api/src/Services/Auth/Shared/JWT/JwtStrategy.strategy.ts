import { User } from "@Models/User";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectEntityManager } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EntityManager } from "typeorm";
import JwtPayload from "./JwtPayload.interface";


@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {
		super({
			secretOrKey:
				"yx1csa65d4aw98f41e9asfd5as61fd3y1f5d1a6w8f49ea74t9af4a6sf1y65x1vdy6dg49awe4g7h49j4d9",
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	async validate(payload: JwtPayload): Promise<User> {
		const { id } = payload;
		const user: User = await this.entityManager.findOne(User, { where: { id } });

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
