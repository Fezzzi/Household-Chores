const path = require('path');
const dotenv = require('dotenv').config();
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const webpackResolver = require('./webpackResolver.config');

module.exports = {
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  ...webpackResolver,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist'),
  },
  entry: {
    js: ['babel-polyfill', 'clientSrc/index.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../code/client/src/index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env.port': dotenv.parsed.port,
    }),
  ],
};
