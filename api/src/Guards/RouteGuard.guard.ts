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

@Injectable()
export class RouterGuard extends AuthGuard(["jwt", "admin-jwt"]) {
	constructor(private reflector: Reflector) {
		super();
	}

	// eslint-disable-next-line class-methods-use-this
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

		// Allow access if the route is marked as PublicAdmin
		if (isPublicAdmin) {
			return true;
		}

		// Proceed with authentication and role checks if not marked as PublicAdmin
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

		// Check if user has one of the required roles
		if (!user || !user.adminRole || !requiredRoles.includes(user.adminRole)) {
			throw new UnauthorizedException("Insufficient role");
		}

		return true;
	}
}
