const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  mode: "production",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [{ test: /\.ts$/, use: "ts-loader" }],
  },
  externalsPresets: { node: true },
  plugins: [
    new webpack.BannerPlugin({
      banner: "#!/usr/bin/env node",
      raw: true,
      entryOnly: true,
    }),
  ],
};
