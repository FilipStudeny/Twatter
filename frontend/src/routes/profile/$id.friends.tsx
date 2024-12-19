import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/$id/friends")({ component: RouteComponent });

function RouteComponent() {
    return <div>Hello "/profile/$id/friends"!</div>;
}
