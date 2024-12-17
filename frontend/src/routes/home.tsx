import Box from "@mui/material/Box/Box";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Typography from "@mui/material/Typography/Typography";
import { createFileRoute } from "@tanstack/react-router";
import { AppRoutes } from "../utils/routesConfig";

const Home = () => {
    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    p: 3,
                    order: 1,
                    transition: "margin 0.3s",
                }}
            >
                <Toolbar />
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Main Content
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    Resize the window to see how the layout changes. On large screens,
                    both sidebars start open by default.
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    The left sidebar acts as a navigation menu with submenus. The right
                    sidebar shows a list of online users as simple cards.
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    On small screens, the right sidebar disappears, and the left sidebar
                    becomes a temporary overlay. Use the top-left button to toggle the
                    left sidebar. On large screens, toggle the right sidebar with the
                    floating button at the bottom-right.
                </Typography>
                {Array.from({ length: 20 }).map((_, index) => (
                    <Typography key={index}>
                        This is some filler content line {index + 1}.
                    </Typography>
                ))}
            </Box>
        </>
    );
};

export const Route = createFileRoute(AppRoutes.HOME._)({ component: Home });
