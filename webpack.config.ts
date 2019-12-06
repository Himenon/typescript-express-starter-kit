import * as path from "path";
import * as webpack from "webpack";

export const generateConfig = (isProduction: boolean): webpack.Configuration => {
  return {
    target: "node",
    mode: isProduction ? "production" : "development",
    entry: {
      server: ["./src/index.ts"],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
      libraryTarget: "commonjs2",
    },
    optimization: {
      minimize: isProduction,
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: "ts-loader",
              options: { compilerOptions: { sourceMap: !isProduction } },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production"),
      }),
    ],
  };
};

export default generateConfig(process.env.NODE_ENV === "production");
