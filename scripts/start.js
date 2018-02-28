"use strict";

process.env.NODE_ENV = "development";

const WebpackDevServer = require("webpack-dev-server");
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

const devServer = new WebpackDevServer(compiler, serverConfig(3000, "/"));

devServer.listen(hostInfo.DEFAULT_PORT, hostInfo.HOST, err => {
  if (err) {
    return console.log(err);
  }
});

["SIGINT", "SIGTERM"].forEach(function(sig) {
  process.on(sig, function() {
    devServer.close();
    process.exit();
  });
});
