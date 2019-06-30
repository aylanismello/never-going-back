// https://jaketrent.com/post/environment-variables-in-nextjs/
const { parsed: localEnv } = require("dotenv").config();
const withProgressBar = require('next-progressbar');
const webpack = require("webpack");

module.exports = withProgressBar({
  target: "serverless",
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

    return config;
  }
});
