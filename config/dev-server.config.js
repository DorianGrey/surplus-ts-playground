const history = require("connect-history-api-fallback");
const convert = require("koa-connect");
const compress = require("compression");

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
    host: "localhost",
    port,
    logLevel: "info",
    logTime: true,
    add: (app, middleware, options) => {
      const historyOptions = {
        // ... see: https://github.com/bripkens/connect-history-api-fallback#options
      };

      app.use(convert(history(historyOptions)));
      app.use(convert(compress()));
    }
  };
};
