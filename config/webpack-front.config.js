const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
require('dotenv').config()

const webpackAliases = require('./webpack-aliases.config')

module.exports = {
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  context: path.resolve(__dirname, '../code/client'),
  ...webpackAliases,
  output: {
    filename: 'main.[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: module =>
            `npm.${module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1].replace('@', '')}`,
        },
      },
    },
  },
  entry: {
    js: ['babel-polyfill', 'clientSrc/index.jsx'],
  },
  devServer: {
    historyApiFallback: true,
    port: 8081,
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
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      // Enables inputting svg files (.svgr) as components to further style them
      // without blocking standard way of .svg files importing
      {
        test: /\.svgr$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: false,
            },
          },
        ],
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
      template: path.resolve(__dirname, '../static/index.html'),
    }),
    new CopyPlugin({
      patterns: [
        { from: '../../static/manifest.json' },
        { from: '../../static/favicon.ico' },
        { from: '../../static/icons/icon-192.png' },
        { from: '../../static/icons/icon-512.png' },
      ],
      options: {
        concurrency: 100,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.API_PORT': process.env.API_PORT,
      'process.env.GOOGLE_CLIENT_ID': process.env.GOOGLE_CLIENT_ID ? JSON.stringify(process.env.GOOGLE_CLIENT_ID) : null,
      'process.env.FB_APP_ID': process.env.FB_APP_ID ? JSON.stringify(process.env.FB_APP_ID) : null,
    }),
  ],
}
