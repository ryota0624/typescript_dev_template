const path = require('path');
const webpack = require("webpack");

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src', 'main', 'app.tsx')
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: '/build/',
    path: path.resolve(__dirname, 'build')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts|\.tsx/,
        use: [
          { loader: 'ts-loader'}
        ],
        exclude: /node_modules/
      },
      {
        enforce: "pre",
        test: /\.ts|\.tsx/,
        use: [
          { loader: 'tslint-loader'}
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "inversify.config": ""
    })
  ],
  resolve: {
    extensions: [
      ".js", ".ts", ".tsx"
    ]
  },
  devServer: {
    contentBase: [path.join(__dirname, 'public')],
    watchContentBase: true,
    publicPath: '/build/',
    compress: true,
    port: 9000
  }
}