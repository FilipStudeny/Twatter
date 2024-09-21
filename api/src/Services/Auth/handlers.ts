import { CreateUserCommandHandler } from "./POST/CreateUserCommand/CreateUserCommand";
import { SignInCommandHandler } from "./POST/SignInCommand/SignInCommand";

const handlers = [CreateUserCommandHandler, SignInCommandHandler];

export default handlers;
