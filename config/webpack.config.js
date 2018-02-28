const path = require("path");

const { EnvironmentPlugin } = require("webpack");
const HotModuleReplacementPlugin = require("webpack/lib/HotModuleReplacementPlugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const paths = require("./paths");
const devServerConfig = require("./dev-server.config");
const { DEFAULT_PORT, HOST, PUBLIC_ADDRESS } = require("./hostInfo");

const publicPath = "/";
const publicUrl = "";
const nodeOptions = {
  fs: "empty",
  net: "empty",
  tls: "empty",
  global: true,
  crypto: "empty",
  process: true,
  module: false,
  clearImmediate: false,
  setImmediate: false
};

const PLUGIN_HTML = function(isDev, publicUrl) {
  const minify = isDev
    ? false
    : {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      };

  return new HtmlWebpackPlugin({
    filename: "index.html", // Keep in mind that the output path gets prepended to this name automatically.
    inject: "body",
    template: paths.appHtml,
    minify,
    // Custom config.
    title: "Demo App",
    devMode: isDev,
    baseHref: "/",
    publicUrl
  });
};

// TODO: Need a prod version!
module.exports = (env = {}) => {
  const isDev = process.env.NODE_ENV !== "production";

  const config = {
    mode: process.env.NODE_ENV || "development",
    entry: {
      app: [paths.appIndex]
    },
    output: {
      path: paths.appBuild,
      filename: "static/js/app.js",
      chunkFilename: "static/js/[name].js",
      publicPath: publicPath,
      pathinfo: true,
      // Point sourcemap entries to original disk location
      devtoolModuleFilenameTemplate: info =>
        path.resolve(info.absoluteResourcePath)
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: require.resolve("surplus-loader")
            },
            {
              loader: require.resolve("ts-loader")
            }
          ]
        }
      ]
    },
    stats: false,
    node: nodeOptions,
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    devtool: isDev ? "inline-source-map" : "source-map",

    plugins: [
      new HotModuleReplacementPlugin(),
      new EnvironmentPlugin({
        NODE_ENV: isDev ? "development" : "production",
        PUBLIC_URL: publicUrl
      }),
      PLUGIN_HTML(isDev, publicUrl)
    ]
  };

  if (!isDev) {
    config.output.filename = "static/js/app.[chunkhash].js";
    config.output.chunkFilename = "static/js/[name].[chunkhash].js";

    config.plugins = config.plugins.filter(
      e => !(e instanceof HotModuleReplacementPlugin)
    );

    config.optimization = {
      splitChunks: {
        chunks: "all"
      }
    };
  }

  return config;
};
