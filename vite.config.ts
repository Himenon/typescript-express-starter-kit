import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

const isProd = process.env.NODE_ENV !== "development";
const APP_VERSION = process.env.CIRCLE_TAG;
const SENTRY_RELEASE = JSON.stringify(APP_VERSION);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log(`
  Build Parameter
    NODE_ENV            : ${process.env.NODE_ENV}
    isProduction        : ${isProd}
    SENTRY_RELEASE      : ${SENTRY_RELEASE}
    VITE_MODE           : ${mode}
  `);
  return {
    base: "/",
    server: {
      // vite server configs, for details see [vite doc](https://vitejs.dev/config/#server-host)
      port: 3000,
    },
    plugins: [
      ...VitePluginNode({
        adapter: "express",
        appPath: "./src/app.ts",
        exportName: "viteNodeApp",
        tsCompiler: "esbuild",
        swcOptions: {},
      }),
    ],
    build: {
      sourcemap: true,
      minify: false,
    },
  };
});
