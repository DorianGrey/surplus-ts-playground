const paths = require("./paths");

module.exports = function(port, publicPath) {
  return {
    content: [paths.appPublic],
    dev: {
      publicPath,
      logLevel: "info",
      logTime: true,
      stats: false
    },
    hot: {
      logLevel: "info",
      logTime: true
    },
    port,
    logLevel: "info",
    logTime: true
  };

  return {
    historyApiFallback: true,
    clientLogLevel: "none",
    compress: true,
    contentBase: paths.appPublic,
    watchContentBase: true,
    hot: true,
    inline: true,
    stats: false,
    // host: "::",
    publicPath,
    watchOptions: {
      ignored: /node_modules/
    },
    // public: `${publicHost}:${port}`,
    overlay: {
      errors: true,
      warnings: false
    }
  };
};
