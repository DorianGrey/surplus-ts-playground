"use strict";

process.env.NODE_ENV = "production";

const webpack = require("webpack");
const fs = require("fs-extra");

const paths = require("../config/paths");
const config = require("../config/webpack.config");

process.on("unhandledRejection", err => {
  console.warn(err);
  throw err;
});

let compiler;
try {
  compiler = webpack(config());
} catch (e) {
  console.error(e);
  process.exit(1);
}

fs.emptyDirSync(paths.appBuild);

compiler.run((err, stats) => {
  if (err) {
    throw err;
  } else {
    console.log(stats.toString({ colors: true }));
  }
});
