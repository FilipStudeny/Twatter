import { createFileRoute, redirect } from "@tanstack/react-router";

import { useAuthenticationStore } from "stores/authentication";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: async ({ context }) => {
    	const loggedIn = useAuthenticationStore.getState().isLoggedIn;

		console.log(loggedIn);
		if (loggedIn === true){
			console.log("asdsadasdasdasd");
		}

		const { isLogged } = context.auth;
		if (!isLogged()) {
			throw redirect({ to: "/sign_in" });
		}
	},
});

