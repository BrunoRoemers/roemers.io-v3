import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import decapDevServer from "./decap-dev-server.mts";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), decapDevServer()],
});
