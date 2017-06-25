import "babel-polyfill";
import startAppServer from "./startAppServer";

const configs = {
  DEVELOPMENT: process.env.NODE_ENV === "development",
  PRODUCTION: process.env.NODE_ENV !== "development",
  APP_PORT: 8080
};

startAppServer(configs);
