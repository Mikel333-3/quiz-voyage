// @lovable.dev/vite-tanstack-config already includes the core TanStack Start/Vite plugins.
// Keep the deployment settings focused on a static GitHub Pages build.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    // GitHub Pages serves this project from /quiz-voyage/.
    base: "/quiz-voyage/",
  },
  tanstackStart: {
    // Generate static HTML so GitHub Pages can serve Quiz Time without a runtime server.
    prerender: {
      enabled: true,
      crawlLinks: true,
      failOnError: true,
    },
  },
});
