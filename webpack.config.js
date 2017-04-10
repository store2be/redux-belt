const path = require('path')
const webpack = require('webpack')

const config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: 'redux-belt.js',
    library: 'redux-belt',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [path.resolve('./src'), path.join(__dirname, 'node_modules')],
    extensions: ['.js'],
  },
}

module.exports = config
