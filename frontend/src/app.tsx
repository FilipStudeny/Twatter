import { NotFound } from "@Components/NotFound";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";

/* eslint-disable @stylistic/object-curly-newline */
import { useAuth } from "hooks/auth";

import { routeTree } from "./routeTree.gen";
const theme = createTheme({});

const router = createRouter({ routeTree, context: { auth: undefined! }, defaultNotFoundComponent: NotFound });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router,
	}
}

const queryClient = new QueryClient();

const App = () => {
	const auth = useAuth();

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<RouterProvider router={router} context={{ auth }} />
			</ThemeProvider>
		</QueryClientProvider>
	);
};

export default App;
