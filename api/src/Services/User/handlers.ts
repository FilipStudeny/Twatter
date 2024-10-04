import { CreateUserCommandHandler } from "./Mutations/CreateUser/CreateUserCommand";
import GetUserQueryHandler from "./Queries/GetUser/GetUserQuery";
import GetUsersQueryHandler from "./Queries/GetUsers/GetUsersQuery";

const handlers = [CreateUserCommandHandler, GetUsersQueryHandler, GetUserQueryHandler];

export default handlers;
