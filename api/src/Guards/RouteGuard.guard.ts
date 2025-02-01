/* eslint-disable class-methods-use-this */
import AdminRole from "@Models/Enums/AdminRole";
import JwtPayload from "@Utils/JWT/JwtPayload.interface";
import { ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const IS_PUBLIC_ADMIN_KEY = "isPublicAdmin";
export const PublicAdmin = () => SetMetadata(IS_PUBLIC_ADMIN_KEY, true);

export const ROLES_KEY = "roles";
export const AdminOnly = (...roles: AdminRole[]) => SetMetadata(ROLES_KEY, roles);

export const NO_ROLES_KEY = "noRoles";
export const NoRoles = () => SetMetadata(NO_ROLES_KEY, true);

@Injectable()
export class RouterGuard extends AuthGuard(["admin-jwt", "jwt"]) {
	constructor(private reflector: Reflector) {
		super();
	}

	getRequest(context: ExecutionContext): Request & { user?: JwtPayload } {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req as Request & { user?: JwtPayload };
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		try {
			await super.canActivate(context);
		} catch (err) {
			if (!isPublic) {
				throw err;
			}
		}

		// Proceed with authentication
		const canActivate = (await super.canActivate(context)) as boolean;
		if (!canActivate) return false;

		const requiredRoles = this.reflector.getAllAndOverride<AdminRole[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		const request = this.getRequest(context);
		const user = request.user as JwtPayload;

		if (!user) {
			throw new UnauthorizedException("User not authenticated");
		}

		if (requiredRoles) {
			// Admin roles are required for this route
			if (!user.adminRole) {
				throw new UnauthorizedException("Admin authentication required");
			}

			if (!requiredRoles.includes(user.adminRole)) {
				throw new UnauthorizedException("User does not have the required admin role");
			}

			// Admin with the required role can access the route
			return true;
		}

		// If no roles are required, allow any authenticated user (admin or regular user)
		return true;
	}
}
