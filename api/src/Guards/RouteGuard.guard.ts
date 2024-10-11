import { ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class RouterGuard extends AuthGuard("jwt") {
	constructor(private reflector: Reflector) {
		super();
	}

	// eslint-disable-next-line class-methods-use-this
	getRequest(context: ExecutionContext): Request {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req;
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		// Return true for public routes
		if (isPublic) {
			return Promise.resolve(true);
		}

		// Call the default JWT guard for protected routes
		return super.canActivate(context) as Promise<boolean>;
	}
}
