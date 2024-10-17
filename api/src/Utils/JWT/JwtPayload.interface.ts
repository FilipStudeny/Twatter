import AdminRole from "@Models/Enums/AdminRole";

export default interface JwtPayload {
	id: string;
	email: string;
	adminRole?: AdminRole;
}
