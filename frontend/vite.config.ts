import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		TanStackRouterVite(),
		viteTsConfigPaths({ projects: ["./tsconfig.json"] }),
	],
});
