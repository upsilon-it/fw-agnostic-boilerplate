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
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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

  devtool: 'source-map',

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
