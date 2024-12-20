import { createFileRoute, redirect } from "@tanstack/react-router";

import { useAuthenticationStore } from "stores/authenticationStore";

export const Route = createFileRoute("/profile")({
	beforeLoad: async () => {
		const loggedIn = useAuthenticationStore.getState().isLoggedIn;

		if (!loggedIn) {
			throw redirect({ to: "/sign-in" });
		}
	},
});
