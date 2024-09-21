import User from "@Models/User.entity";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

const GetUser = createParamDecorator((_, context: ExecutionContext): User => {
	const request = context.switchToHttp().getRequest();
	return request.user;
});

export default GetUser;
