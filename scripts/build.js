"use strict";

process.env.NODE_ENV = "production";

const webpack = require("webpack");
const config = require("../config/webpack.config");

let compiler;
try {
  compiler = webpack(config());
} catch (e) {
  out.error(e).endl();
  process.exit(1);
}

compiler.run((err, stats) => {
  if (err) {
    throw err;
  } else {
    console.log(stats.toString());
  }
});
