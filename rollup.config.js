import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import swc from "rollup-plugin-swc";

const isProduction = process.env.NODE_ENV === "production";

/**
 * @type {import("rollup").RollupOptions}
 */
export default {
  input: "src/app.ts",
  output: {
    format: "cjs",
    file: "dist/server.cjs",
    sourcemap: "inline",
  },
  external: ["fs", "path"],
  plugins: [
    resolve({
      extensions: [".ts", ".js", ".json"],
      modules: ["src", "node_modules"],
    }),
    commonjs(),
    json(),
    swc.default({
      jsc: {
        parser: {
          syntax: "typescript",
          tsx: true,
          dynamicImport: true,
        },
        transform: {
          react: {
            runtime: "automatic",
          },
        },
      },
    }),
  ],
};
