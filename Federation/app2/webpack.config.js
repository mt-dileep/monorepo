const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const path = require("path");
const deps = require("./package.json").dependencies;
module.exports = {
  entry: "./src/index",
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    port: 3002
  },
  target: "web",
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
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      library: { type: "var", name: "app2" },
      filename: "remoteEntry.js",
      exposes: {
        "./Widget": "./src/Widget"
      },
      // adds react as shared module
      // version is inferred from package.json
      // there is no version check for the required version
      // so it will always use the higher version found
      shared: {
        react: {
          requiredVersion: deps.react,
          import: "react", // the "react" package will be used a provided and fallback module
          shareKey: "react", // under this name the shared module will be placed in the share scope
          shareScope: "default", // share scope with this name will be used
          singleton: true // only a single version of the shared module is allowed
        },
        "react-dom": {
          requiredVersion: deps["react-dom"],
          singleton: true // only a single version of the shared module is allowed
        },
        // adds moment as shared module
        // version is inferred from package.json 2.24.0
        // it will use the highest moment version that is >= 2.24 and < 3
        /**
         * If app1 loaded first WARNING
         * Unsatisfied version 2.29.4 from app1 of shared singleton module moment (required =2.24.0)
         */
        //  moment: {
        //   requiredVersion: deps.moment, //2.24.0
        //   singleton: true
        // }

        /**
         * moment is not shared by host(no dep there),
         * it is shared by other app app1
         * and if loaded first with below setting, then ERROR
         * Uncaught Error: Shared module moment doesn't exist in shared scope default
         * In this case host app should have share moment otherwise loading app2 before app1 will break
         */
        // moment: {
        //   singleton: true,
        //   import: false // use from shared scope, don't bring its own
        // },
        moment: {
          singleton: true
        }
      }
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" })
  ]
};
