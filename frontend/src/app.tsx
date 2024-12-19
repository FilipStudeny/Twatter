import { NotFound } from "@Components/NotFound";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

/* eslint-disable @stylistic/object-curly-newline */
/* eslint-disable @stylistic/brace-style */
import { useAuth } from "hooks/auth";

import { routeTree } from "./routeTree.gen";
const theme = createTheme({});

const router = createRouter({ routeTree, context: { auth: undefined! }, defaultNotFoundComponent: NotFound });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router,
	}
}

const App = () => {
	const auth = useAuth();

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<RouterProvider router={router} context={{ auth }} />
			<TanStackRouterDevtools router={router} />
		</ThemeProvider>
	);
};

export default App;
