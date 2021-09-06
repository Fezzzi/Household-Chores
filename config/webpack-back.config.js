const path = require('path')
const nodeExternals = require('webpack-node-externals')
const NodemonPlugin = require('nodemon-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const svgToMiniDataURI = require('mini-svg-data-uri')

const webpackAliases = require('./webpack-aliases.config')

module.exports = {
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'inline-source-map',
  target: 'node',
  externals: [nodeExternals()],

  context: path.resolve(__dirname, '../code/server'),
  ...webpackAliases,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../build-api'),
  },
  entry: {
    app: ['babel-polyfill', 'serverSrc/index.ts'],
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              generator: content => svgToMiniDataURI(content.toString()),
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new NodemonPlugin({
      script: path.resolve(__dirname, '../build-api/bundle.js'),
    }),
    new CopyPlugin({
      patterns: [
        { from: '../../static/icons/icon-150.png' },
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
}
