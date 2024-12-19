import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
	beforeLoad: async ({ context }) => {
		const { isLogged } = context.auth;
		if (!isLogged()) {
			throw redirect({ to: "/sign_in" });
		}
	},
});
