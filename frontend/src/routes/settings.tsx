import { useAuthenticationStore } from "@Stores/authenticationStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
	beforeLoad: async () => {
		const loggedIn = useAuthenticationStore.getState().isLoggedIn;

		if (!loggedIn) {
			throw redirect({ to: "/sign-in" });
		}
	},
});
