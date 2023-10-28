const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
// webpack needs to be explicitly required
const webpack = require('webpack')
// import webpack from 'webpack' // (if you're using ESM)
module.exports = {
    plugins: [
        new NodePolyfillPlugin(),
         // fix "process is not defined" error:
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    
    ],
    resolve: {
    fallback: {
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify")
    }
  }
    
}