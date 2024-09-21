import { GetRoleByIdHandler } from "./GET/GetRoleQuery/GetRoleQuery";
import { GetAllRolesHandler } from "./GET/GetRolesQuery/GetRolesQuery";
import { CreateRoleCommandHandler } from "./POST/CreateRoleCommand/CreteRoleCommand";

const handlers = [GetRoleByIdHandler, CreateRoleCommandHandler, GetAllRolesHandler];

export default handlers;
