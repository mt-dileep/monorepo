const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const webpack = require("webpack");
const path = require("path");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" }).parsed;

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  target: "web",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    port: 3009
  },
  output: {
    publicPath: "auto"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"]
        }
      },
      { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shellapp",
      // adds react as shared module
      // version is inferred from package.json
      // there is no version check for the required version
      // so it will always use the higher version found
      shared: {
        react: {
          import: "react", // the "react" package will be used a provided and fallback module
          shareKey: "react", // under this name the shared module will be placed in the share scope
          shareScope: "default", // share scope with this name will be used
          singleton: true // only a single version of the shared module is allowed
        },
        "react-dom": {
          singleton: true // only a single version of the shared module is allowed
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv)
    })
  ]
};
