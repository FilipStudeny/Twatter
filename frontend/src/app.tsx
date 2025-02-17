import { NotFound } from "@Components/NotFound";
import { useAuthenticationStore } from "@Stores/authenticationStore";
import { TokenRefreshHandler } from "@Utils/authHandler";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useEffect } from "react";

import { routeTree } from "./routeTree.gen";
import { setAuthorizationHeader } from "../../shared";

const theme = createTheme({});
const router = createRouter({
	routeTree,
	context: { auth: undefined! },
	defaultNotFoundComponent: NotFound,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router,
	}
}

/*
	FOR SOME UKNOWN REASON THIS SEEMS TO WORK, USER IS REAUTHENTICATED WITH REFRESH TOKEN
*/
let isRefreshing = false;
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: (failureCount, error: any) => {
				const errorMessage = error?.response?.errors?.[0]?.extensions?.originalError?.message;
				console.log("Error message:", errorMessage);

				if (errorMessage === "Unauthorized") {
					if (!isRefreshing) {
						isRefreshing = true;

						TokenRefreshHandler.refreshToken()
							.then(() => {
								isRefreshing = false;
								queryClient.invalidateQueries();
							})
							.catch((refreshError) => {
								isRefreshing = false;
								console.error("Token refresh failed:", refreshError);
							});
					}

					return true;
				}

				return failureCount < 3;
			},
		},
		mutations: {
			onError: async (error: any) => {
				const errorMessage = error?.response?.errors?.[0]?.extensions?.originalError?.message;
				if (errorMessage === "Unauthorized") {
					try {
						await TokenRefreshHandler.refreshToken();
					} catch (refreshError) {
						// If refresh fails, we'll be logged out automatically
						console.error("Token refresh failed:", refreshError);
					}
				}
			},
		},
	},
});

const App = () => {
	const loggedIn = useAuthenticationStore.getState().isLoggedIn;
	const accessToken = useAuthenticationStore.getState().getAccessToken();

	useEffect(() => {
		if (loggedIn && accessToken) {
			setAuthorizationHeader(accessToken);
			console.log(accessToken);
		}
	}, [loggedIn, accessToken]);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<RouterProvider router={router} />
			</ThemeProvider>
		</QueryClientProvider>
	);
};

export default App;
