const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;
module.exports = {
  entry: "./app.tsx",
  mode: "development",
  target: "web",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    port: 3001
  },
  output: {
    publicPath: "auto",
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
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
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ]
};
