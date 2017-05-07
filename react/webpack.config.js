'use strict';

const path = require('path');

const port = 8888;
const bundleFilename = 'bundle.js';
const distPath = '/dist';

module.exports = {
  entry: [
    './src/index.js',
    'webpack-dev-server/client?http://localhost:' + port
  ],
  output: {
    filename: bundleFilename,
    path: path.resolve(__dirname, 'dist'),
    publicPath: distPath
  },
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true,
    port: port,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        exclude: /node_modules/
      }
    ]
  },
}