import { Layout } from "@Components/layout/Layout";
import { createRootRouteWithContext } from "@tanstack/react-router";

import { AuthContext } from "hooks/auth";

type RouterContext = { auth: AuthContext };

export const Route = createRootRouteWithContext<RouterContext>()({ component: Layout });
