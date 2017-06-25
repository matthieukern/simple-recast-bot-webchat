const path = require("path");

const HotModuleReplacementPlugin = require("webpack/lib/HotModuleReplacementPlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const resolve = {
  extensions: [".js", ".json", ".jsx"]
};

const buildConfiguration = (env = "") => {
  const node = { __dirname: true, __filename: true };

  const devClientConfig = {
    name: "dev.client",
    target: "web",
    entry: {
      "client.bundle": [
        "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true",
        path.resolve(__dirname, "../src/client/client.jsx")
      ]
    },
    output: {
      path: path.resolve(__dirname, "../dist/client"),
      filename: "[name].js",
      sourceMapFilename: "[name].js.map",
      publicPath: "/"
    },
    node,
    resolve,
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: "babel-loader",
          exclude: /node_modules/
        },
        {
          test: /\.(jp[e]?g|png|gif|svg)$/i,
          loader: "file-loader?name=img/[name].[ext]"
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: "css-loader"
          })
        }
      ]
    },
    plugins: [
      new HotModuleReplacementPlugin(),
      new ExtractTextPlugin("styles.css")
    ],
    devtool: "source-map"
  };

  const devServerConfig = {
    name: "dev.server",
    target: "node",
    externals: [
      /^[a-z\-0-9]+$/,
      {
        "react-dom/server": true,
        "styled-components/lib/models/StyleSheet": "commonjs styled-components/lib/models/StyleSheet"
      }
    ],
    entry: {
      "server.bundle": path.resolve(__dirname, "../src/server/index.js")
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "../dist/server"),
      publicPath: "/",
      libraryTarget: "commonjs2"
    },
    node,
    resolve,
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: "babel-loader",
          exclude: /node_modules/
        },
        {
          test: /\.(jp[e]?g|png|gif|svg)$/i,
          loader: "file-loader?name=img/[name].[ext]"
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: "css-loader"
          })
        }
      ]
    },
    plugins: [new ExtractTextPlugin("styles.css")]
  };

  return env.indexOf("browser") >= 0 ? devClientConfig : devServerConfig;
};

module.exports = buildConfiguration;
