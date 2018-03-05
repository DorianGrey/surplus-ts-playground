"use strict";

const express = require("express");
const compression = require("compression");
const path = require("path");
const yargs = require("yargs");

const paths = require("../config/paths");

const intendedPort = yargs.argv.port || 5000;

const app = express();
const serveDir = paths.appBuild;

app.use(compression());
app.use("/", express.static(path.resolve(process.cwd(), serveDir)));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(serveDir + "/index.html"))
);

app.listen(intendedPort, () => {
  console.log(`Serving files from ${serveDir} ...`);
  console.log(`Listening on http://localhost:${intendedPort}...`);
});
