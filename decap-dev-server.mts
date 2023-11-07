import type { AstroIntegration } from "astro";
import { spawn } from "node:child_process";

const decapDevServer = (): AstroIntegration => {
  let proxy: ReturnType<typeof spawn>;

  return {
    name: "decap-dev-server",
    hooks: {
      // source: https://github.com/delucis/astro-netlify-cms/blob/latest/integration/index.ts#L78-L89
      "astro:server:start": () => {
        proxy = spawn("decap-server", {
          stdio: "inherit",
          // Run in shell on Windows to make sure the npm package can be found.
          shell: process.platform === "win32",
        });
        process.on("exit", () => proxy.kill());
      },

      "astro:server:done": () => {
        proxy.kill();
      },
    },
  };
};

export default decapDevServer;
