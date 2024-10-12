// current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

import JwtPayload from "./JwtPayload.interface";

export const CurrentUser = createParamDecorator((_data: unknown, context: ExecutionContext): JwtPayload => {
	const ctx = GqlExecutionContext.create(context);
	return ctx.getContext().req.user;
});
