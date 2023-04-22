import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import swc from "rollup-plugin-swc";

/**
 * @type {import("rollup").RollupOptions}
 */
export default {
  input: "src/app.ts",
  output: {
    format: "cjs",
    file: "dist/server.cjs",
    generatedCode: {
      constBindings: true,
    },
  },
  external: ["fs", "path"],
  plugins: [
    resolve({
      extensions: [".ts", ".js", ".json"],
      moduleDirectories: ["src", "node_modules"],
      preferBuiltins: true,
    }),
    commonjs(),
    json(),
    swc.default({
      jsc: {
        parser: {
          syntax: "typescript",
          tsx: false,
          dynamicImport: false,
        },
      },
    }),
  ],
};
