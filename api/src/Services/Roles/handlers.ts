import { GetRoleByIdHandler } from "./GET/GetRoleQuery/GetRoleQuery";
import { GetAllRolesHandler } from "./GET/GetRolesQuery/GetRolesQuery";
import { CreateRoleHandler } from "./POST/CreateRoleCommand/CreteRoleCommand";

const handlers = [GetRoleByIdHandler, CreateRoleHandler, GetAllRolesHandler];

export default handlers;
