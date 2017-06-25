const path = require("path");

const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const resolve = {
  extensions: [".js", ".json", ".jsx"]
};

const buildConfiguration = (env = "") => {
  const node = { __dirname: true, __filename: true };

  return {
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
          loader: "babel-loader"
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
      new ExtractTextPlugin("styles.css"),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production")
      }),
      new webpack.optimize.UglifyJsPlugin()
    ]
  };
};

module.exports = buildConfiguration;
