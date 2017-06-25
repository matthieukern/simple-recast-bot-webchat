// @flow
import path from "path";
import express from "express";
import compress from "compression";
import bodyparser from "body-parser";
import RecastAIClient from "recastai";
import config from "../shared/config";
import serverSideRendering from "./server.jsx";

const recast = new RecastAIClient.request(config.private.recast.token);

export default function startAppServer(
  configs: {
    DEVELOPMENT: boolean,
    PRODUCTION: boolean,
    APP_PORT: number
  }
) {
  const appServer = express();

  appServer.locals.development = configs.DEVELOPMENT;
  appServer.locals.production = configs.PRODUCTION;

  const port = process.env.PORT || configs.APP_PORT;
  appServer.set("port", port);

  appServer.enable("case sensitive routing");
  appServer.enable("strict routing");
  appServer.disable("x-powered-by");

  appServer.use(bodyparser.json());

  appServer.use(compress({ threshold: 0 }));
  appServer.use(
    express.static(path.resolve(__dirname, "..", "..", "dist", "client"))
  );

  // If in development mode, expose a webpack dev middleware.
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

  // Proxy the recast.ai api to not send secret to the client.
  appServer.post("/api/converse", (req: Object, res: Object) => {
    const { message, token } = req.body;
    recast
      .converseText(message, { conversationToken: token })
      .then(botResponse => {
        const newToken = botResponse.conversationToken;
        const replies = botResponse.replies;
        res.json({
          token: newToken,
          replies
        });
      });
  });

  // Use the server side rendering function to manage isomorphism.
  appServer.use(serverSideRendering);

  appServer.listen(appServer.get("port"), function listen() {
    const host = this.address().address;
    console.log("Server launched at http://%s:%s", host, port);
  });
}
