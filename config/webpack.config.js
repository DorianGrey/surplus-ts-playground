const path = require("path");

const { EnvironmentPlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

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

const shouldUseRelativeAssetPaths = paths.publicPath === "./";
// Note: defined here because it will be used more than once.
const cssFilename = "static/css/[name].[contenthash:8].css";

// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? // Making sure that the publicPath goes back to to build folder.
    { publicPath: Array(cssFilename.split("/").length).join("../") }
  : {};

const POSTCSS_PLUGINS = () => [
  require("postcss-flexbugs-fixes"),
  require("autoprefixer")({
    browsers: [
      ">1%",
      "last 4 versions",
      "Firefox ESR",
      "not ie < 11" // supporting IE < 11 should not be required anymore, due to the lack of usage statistics.
    ],
    flexbox: "no-2009"
  })
];

const RULE_SCSS = function(isDev) {
  // Development mode docs:
  // "postcss" loader applies autoprefixer to our CSS.
  // "css" loader resolves paths in CSS and adds assets as dependencies.
  // "style" loader turns CSS into JS modules that inject <style> tags.
  // In production, we use a plugin to extract that CSS to a file, but
  // in development "style" loader enables hot editing of CSS.

  // Production mode docs:
  // The notation here is somewhat confusing.
  // "postcss" loader applies autoprefixer to our CSS.
  // "css" loader resolves paths in CSS and adds assets as dependencies.
  // "style" loader normally turns CSS into JS modules injecting <style>,
  // but unlike in development configuration, we do something different.
  // `ExtractTextPlugin` first applies the "postcss" and "css" loaders
  // (second argument), then grabs the result CSS and puts it into a
  // separate file in our build process. This way we actually ship
  // a single CSS file in production instead of JS code injecting <style>
  // tags. If you use code splitting, however, any async bundles will still
  // use the "style" loader inside the async code so CSS from them won't be
  // in the main CSS file.
  // [Note]: Atm., this chain causes a warning from the postcss-loader that it
  // found a source-map, but is not configured to retain it, so it will be discarded.
  // This is caused by a configuration problem of resolve-url-loader
  // (see https://github.com/bholloway/resolve-url-loader/issues/60), and can safely
  // be ignored.

  const scssLoaderChain = [
    {
      loader: require.resolve("css-loader"),
      options: {
        importLoaders: 1,
        minimize: !isDev,
        sourceMap: isDev
      }
    },
    {
      loader: require.resolve("postcss-loader"),
      options: {
        sourceMap: isDev,
        ident: "postcss", // https://webpack.js.org/guides/migrating/#complex-options
        plugins: POSTCSS_PLUGINS
      }
    },
    {
      loader: require.resolve("sass-loader"),
      options: {
        sourceMap: isDev,
        outputStyle: isDev ? "nested" : "compressed"
      }
    }
  ];

  const result = { test: /\.scss$/ };
  const styleLoader = require.resolve("style-loader");

  if (isDev) {
    result.use = [styleLoader].concat(scssLoaderChain);
  } else {
    result.use = ExtractTextPlugin.extract(
      Object.assign(
        {
          fallback: styleLoader,
          use: scssLoaderChain
        },
        extractTextPluginOptions
      )
    );
  }

  return result;
};

// TODO: Need a prod version!
module.exports = (env = {}) => {
  const isDev = process.env.NODE_ENV !== "production";

  const config = {
    bail: !isDev,
    mode: process.env.NODE_ENV || "development",
    entry: {
      app: [paths.appIndex]
    },
    output: {
      path: paths.appBuild,
      filename: "static/js/[name].js",
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
              loader: require.resolve("ts-loader"),
              options: {
                transpileOnly: true
              }
            }
          ]
        },
        RULE_SCSS(isDev)
      ]
    },
    stats: "errors-only",
    node: nodeOptions,
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    devtool: isDev ? "inline-source-map" : "source-map",

    optimization: {
      noEmitOnErrors: true
    },

    plugins: [
      new EnvironmentPlugin({
        NODE_ENV: isDev ? "development" : "production",
        PUBLIC_URL: publicUrl
      }),
      PLUGIN_HTML(isDev, publicUrl),
      new ForkTsCheckerWebpackPlugin({
        watch: paths.appSrc,
        async: isDev,
        tslint: paths.appTsLint,
        tsconfig: paths.appTsConfig,
        formatter: "codeframe"
      })
    ].filter(Boolean)
  };

  if (!isDev) {
    config.output.filename = "static/js/[name].[chunkhash:8].js";
    config.output.chunkFilename = "static/js/[name].[chunkhash:8].js";

    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendors: {
            chunks: "all",
            test: /[\\\/]node_modules[\\\/]/,
            priority: -10,
            name: "vendor"
          }
        }
      },
      runtimeChunk: { name: "runtime" }
    };

    config.plugins.push(
      new ExtractTextPlugin({
        filename: cssFilename
      }),
      new CopyWebpackPlugin(["**/*.png", "**/*.webmanifest"], {
        context: paths.appPublic
      })
    );
  }

  return config;
};
