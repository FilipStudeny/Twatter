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
export const Roles = (...roles: AdminRole[]) => SetMetadata(ROLES_KEY, roles);

export const NO_ROLES_KEY = "noRoles";
export const NoRoles = () => SetMetadata(NO_ROLES_KEY, true);

@Injectable()
export class RouterGuard extends AuthGuard(["jwt", "admin-jwt"]) {
	constructor(private reflector: Reflector) {
		super();
	}

	getRequest(context: ExecutionContext): Request & { user?: JwtPayload } {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req as Request & { user?: JwtPayload };
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		// Check if the route is marked as PublicAdmin
		const isPublicAdmin = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_ADMIN_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (isPublicAdmin) {
			return true;
		}

		// Check if the route is marked as NoRoles
		const noRolesRequired = this.reflector.getAllAndOverride<boolean>(NO_ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		// If @NoRoles is present, allow access without role checks
		if (noRolesRequired) {
			return true;
		}

		// Proceed with role checks if @NoRoles is not present
		const requiredRoles = this.reflector.getAllAndOverride<AdminRole[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		// Default guard behavior if no roles are specified
		if (!requiredRoles) {
			return super.canActivate(context) as Promise<boolean>;
		}

		// Authenticate and authorize based on roles
		const canActivate = (await super.canActivate(context)) as boolean;
		if (!canActivate) return false;

		const request = this.getRequest(context);
		const { user } = request;

		// Check if the user has one of the required roles
		if (user && requiredRoles.includes(user.adminRole)) {
			return true;
		}

		// If the user is not an admin, check for regular user authentication
		if (!user || !user.id) {
			throw new UnauthorizedException("You must be authenticated as a user or an admin");
		}

		return true;
	}
}
