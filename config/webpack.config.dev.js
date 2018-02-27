'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

module.exports = {
  entry: [paths.appIndexJs],

  output: {
    path: paths.appBuild,
    filename: 'js/bundle.js',
    publicPath: paths.publicUrl,
    pathinfo: true,
  },

  resolve: {
    alias: {
      '@': paths.appSrc,
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: false,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
  ],

  devtool: 'cheap-module-source-map',

  performance: {
    hints: false,
  },

  devServer: {
    compress: true,
    contentBase: paths.appPublic,
    hot: true,
    publicPath: paths.publicPath,
  },
};
