const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (...relativePath) =>
  path.resolve(appDirectory, ...relativePath);

const publicPath = "/";
const publicUrl = publicPath.slice(0, -1);

module.exports = {
  resolveApp: resolveApp,
  appRoot: resolveApp("."),
  appPublic: resolveApp("public"),
  appBuild: resolveApp("build"),
  appBuildStats: resolveApp("buildStats"),
  appSrc: resolveApp("src"),
  appIndex: resolveApp("src/index.tsx"),
  appHtml: resolveApp("public/index.template.html"),
  appGenerated: resolveApp("src/generated"),
  appPackageJson: resolveApp("package.json"),
  appPackageLock: resolveApp("package-lock.json"),
  appTsLint: resolveApp("tslint.json"),
  appTsConfig: resolveApp("tsconfig.json"),
  publicPath,
  publicUrl
};
