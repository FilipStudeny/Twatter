import Typography from "@mui/material/Typography/Typography";
import { createFileRoute } from "@tanstack/react-router";

import { AppRoutes } from "../utils/routesConfig";
import { useAuthenticationStore } from "stores/authentication";

const Home = () => {

    const isLoggedIn = useAuthenticationStore((state) => state.isLoggedIn);

    return (
		<>
			{ isLoggedIn &&
				<Typography variant='h4' sx={{ mb: 2 }}>
					Main Content
				</Typography>
			}
			<Typography variant='h4' sx={{ mb: 2 }}>
				Main Content
			</Typography>
			<Typography sx={{ mb: 2 }}>
				Resize the window to see how the layout changes. On large screens, both sidebars start open by default.
			</Typography>
			<Typography sx={{ mb: 2 }}>
				The left sidebar acts as a navigation menu with submenus. The right sidebar shows a list of online users
				as simple cards.
			</Typography>
			<Typography sx={{ mb: 2 }}>
				On small screens, the right sidebar disappears, and the left sidebar becomes a temporary overlay. Use
				the top-left button to toggle the left sidebar. On large screens, toggle the right sidebar with the
				floating button at the bottom-right.
			</Typography>
			{Array.from({ length: 20 }).map((_, index) => (
				<Typography key={index}>This is some filler content line {index + 1}.</Typography>
			))}
		</>
	);
};

export const Route = createFileRoute(AppRoutes.HOME._)({ component: Home });
