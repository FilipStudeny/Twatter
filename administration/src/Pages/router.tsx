import { createBrowserRouter } from "react-router-dom";

import Layout from "./Layout";
import SignIn from "./SignIn/SignIn.page";
import { AppRoutes } from "../constants/appRoutes.router";

export const routes = createBrowserRouter([
	{
		path: "/",
		element: <Layout />, // This layout will be applied to nested routes
	},
	{
		path: AppRoutes.SignIn.path,
		element: <SignIn />, // Login page route
	},
]);
