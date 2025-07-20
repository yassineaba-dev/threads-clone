import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	const API_URL = env.VITE_API_URL;

	return {
		plugins: [react()],
		server: {
			port: 5173,
			proxy: {
				"/api": {
					target: API_URL,
					changeOrigin: true,
					secure: false,
					configure: (proxy) => {
						proxy.on("proxyReq", (proxyReq, req) => {
							proxyReq.setHeader("Origin", API_URL);
						});
					},
				},
			},
		},
	};
});