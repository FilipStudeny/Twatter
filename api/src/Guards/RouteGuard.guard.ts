import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class RouterGuard extends AuthGuard("jwt") {
	// eslint-disable-next-line class-methods-use-this
	getRequest(context: ExecutionContext): Request {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req;
	}
}
