import { NotFound } from "@Components/NotFound";
import { useAuthenticationStore } from "@Stores/authenticationStore";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useEffect } from "react";

import { routeTree } from "./routeTree.gen";
import { setAuthorizationHeader } from "../../shared";
const theme = createTheme({});

const router = createRouter({ routeTree, context: { auth: undefined! }, defaultNotFoundComponent: NotFound });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router,
	}
}

const queryClient = new QueryClient();

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
				<RouterProvider router={router}/>
			</ThemeProvider>
		</QueryClientProvider>
	);
};

export default App;
