// @lovable.dev/vite-tanstack-config already includes the core TanStack Start/Vite plugins.
// Keep the deployment settings focused on a static GitHub Pages build.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  vite: {
    // GitHub Pages serves this project from /quiz-voyage/.
    base: "/quiz-voyage/",
    // The Lovable wrapper supplies the TanStack Start plugin. This Nitro override
    // gives prerendering a Node-compatible preview server instead of the default
    // Cloudflare module server, so the crawler can render static HTML safely.
    plugins: [nitro({ preset: "node-server" })],
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
