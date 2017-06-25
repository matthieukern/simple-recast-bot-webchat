import path from "path";
import express from "express";
import compress from "compression";
import serverSideRendering from "./server.jsx";

export default function startAppServer(configs, callback) {
  const appServer = express();

  appServer.locals.development = configs.DEVELOPMENT;
  appServer.locals.production = configs.PRODUCTION;

  const port = process.env.PORT || configs.APP_PORT;
  appServer.set("port", port);

  appServer.enable("case sensitive routing");
  appServer.enable("strict routing");
  appServer.disable("x-powered-by");

  appServer.use(compress({ threshold: 0 }));
  appServer.use(
    express.static(path.resolve(__dirname, "..", "..", "dist", "client"))
  );

  if (appServer.locals.development) {
    const webpack = require("webpack");
    const webpackConfig = require("../../webpack/webpack.dev.js")("browser");
    const webpackCompiler = webpack(webpackConfig);

    appServer.use(
      require("webpack-dev-middleware")(webpackCompiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        stats: {
          colors: true,
          reasons: false
        }
      })
    );

    appServer.use(
      require("webpack-hot-middleware")(webpackCompiler, {
        path: "/__webpack_hmr",
        heartbeat: 10 * 1000
      })
    );
  }

  appServer.use(serverSideRendering);

  appServer.listen(appServer.get("port"), function listen() {
    const host = this.address().address;
    console.log("Server launched at http://%s:%s", host, port);
    if (callback) {
      callback();
    }
  });
}
