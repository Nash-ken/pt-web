import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const inDev = mode === "development";
  return {
    plugins: [tailwindcss(), sveltekit()],
    server: {
      host: true, // accessible on local network
      port: 5173, // default, but you can lock it
      open: false, // auto-open browser if true
      strictPort: true, // fail instead of auto-fallback
      cors: true,
    },
    build: {
      target: "baseline-widely-available",
      sourcemap: inDev,
      minify: "esbuild",
      cssCodeSplit: true,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
  };
});
