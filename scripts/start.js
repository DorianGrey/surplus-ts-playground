"use strict";

process.env.NODE_ENV = "development";

const serve = require("webpack-serve");
const webpack = require("webpack");

const hostInfo = require("../config/hostInfo");
const wpConfig = require("../config/webpack.config");
const serverConfig = require("../config/dev-server.config");

process.on("unhandledRejection", err => {
  console.warn(err);
  throw err;
});

let compiler;

try {
  compiler = webpack(wpConfig());
} catch (e) {
  console.warn(e);
  process.exit(1);
}

const devServer = serve({
  compiler,
  ...serverConfig(3000, "/")
});

devServer.catch(err => {
  console.error(err);
  process.exit(1);
});
