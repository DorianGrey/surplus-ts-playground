const paths = require("./paths");

module.exports = function(port, publicPath) {
  return {
    content: [paths.appPublic],
    dev: {
      publicPath,
      logLevel: "info",
      logTime: true,
      stats: "errors-only"
    },
    hot: {
      logLevel: "info",
      logTime: true
    },
    port,
    logLevel: "info",
    logTime: true
  };
};
