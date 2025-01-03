import { Layout } from "@Components/layout/Layout";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";

import { AuthContext } from "hooks/auth";

type RouterContext = { auth: AuthContext, query: QueryClient };

export const Route = createRootRouteWithContext<RouterContext>()({ component: Layout });
