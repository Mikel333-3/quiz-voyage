// @lovable.dev/vite-tanstack-config already includes the core TanStack Start/Vite plugins.
// We only add the deployment settings needed for a static GitHub Pages build.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    // GitHub Pages serves this project from /quiz-voyage/.
    base: "/quiz-voyage/",
  },
  tanstackStart: {
    // Generate static HTML for the routes that can be discovered at build time.
    // This lets GitHub Pages serve Quiz Time without a Nitro server.
    prerender: {
      enabled: true,
      crawlLinks: true,
      failOnError: true,
    },
    server: { entry: "server" },
  },
});
