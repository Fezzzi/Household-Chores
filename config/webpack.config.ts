import path from 'path'
import webpack from 'webpack'
import HtmlWebPackPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import { config } from 'dotenv'

import webpackAliases from './webpack-aliases'

config()

module.exports = {
  // Enable sourcemaps for debugging webpack's output.
  devtool: process.env.DEBUG === 'true' ? 'source-map' : undefined,

  context: path.resolve(__dirname, '../src/web'),
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
      minSize: 20000,
      maxInitialRequests: Infinity,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: (module: { context: string }) =>
            `npm.${module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)?.[1].replace('@', '') ?? ''}`,
        },
      },
    },
  },
  entry: 'web/index.jsx',
  devServer: {
    historyApiFallback: true,
    port: process.env.DEV_PORT ?? 8081,
    proxy: {
      '/uploads': {
        target: `http://localhost:${process.env.API_PORT ?? 8080}`,
      },
      '/static': {
        target: `http://localhost:${process.env.API_PORT ?? 8080}`,
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ts|tsx|jsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader'],
      },
      // Enables inputting svg files as components to further style them
      {
        test: /\.svg$/,
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
      process.env.DEBUG === 'true'
        ? {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          options: {
            filterSourceMappingUrl: (url: string, resourcePath: string) => !/.*[/\\]node_modules[/\\].*/.test(resourcePath),
          },
        }
        : {},
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: '../assets/index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: '../assets/manifest.json' },
        { from: '../assets/favicon.ico' },
        { from: '../assets/logos' },
      ],
      options: {
        concurrency: 100,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.API_PORT': process.env.API_PORT,
      'process.env.GOOGLE_CLIENT_ID': process.env.GOOGLE_CLIENT_ID ? JSON.stringify(process.env.GOOGLE_CLIENT_ID) : null,
      'process.env.FB_APP_ID': process.env.FB_APP_ID ? JSON.stringify(process.env.FB_APP_ID) : null,
      'process.env.MOCHA_TEST': process.env.MOCHA_TEST ?? false,
    }),
  ],
}
