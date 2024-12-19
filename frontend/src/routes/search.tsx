import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "hooks/auth";

type SerachFilters = {
    query: string,
    isBlocked: boolean,
};

export const Route = createFileRoute("/search")({
    validateSearch: (search: Record<string, unknown>): SerachFilters => {
        return {
            query: search.query as string,
            isBlocked: search.isBlocked === "true",
        };
    }
    , component: RouteComponent,
});

function RouteComponent() {

    const { isBlocked, query } = Route.useSearch();

    const navigate = useNavigate({ from: Route.fullPath });

    return (
        <>
            <div>Hello "/search"!</div>
            <input
                value={query}
                onChange={(e) => {
                    navigate({ search: (prev) => ({ ...prev, query: e.target.value }) });
                }}
            />
            <pre>
                { JSON.stringify({ query, isBlocked }, null, 2) }
            </pre>
        </>
    );

}
