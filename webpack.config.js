const path = require('path')

const config = {
  entry: __dirname.join('/src/index.js'),
  devtool: 'source-map',
  output: {
    path: __dirname.join('/lib'),
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
