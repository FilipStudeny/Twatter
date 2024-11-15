import { registerEnumType } from "@nestjs/graphql";

enum AdminRole {
	MODERATOR = "moderator",
	SUPERVISOR = "supervisor",
	ADMINISTRATOR = "administrator",
	ADMIN = "ADMIN",
	SUPER_ADMIN = "SUPER_ADMIN",
}

registerEnumType(AdminRole, {
	name: "AdminRole",
	description: "Different types of roles available",
});

export default AdminRole;
