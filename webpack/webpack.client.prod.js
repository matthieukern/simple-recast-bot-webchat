const path = require("path");

const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const resolve = {
  extensions: [".js", ".json", ".jsx"]
};

const buildConfiguration = (env = "") => {
  const node = { __dirname: true, __filename: true };

  return {
    name: "dev.client",
    target: "web",
    entry: {
      "client.bundle": [path.resolve(__dirname, "../src/client/client.jsx")]
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
          loader: "babel-loader"
        },
        {
          test: /\.(jp[e]?g|png|gif|svg)$/i,
          loader: "file-loader?name=img/[name].[ext]"
        },
        {
          test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          loader: "file-loader?name=fonts/[name].[ext]"
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
