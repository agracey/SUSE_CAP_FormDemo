var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack')

module.exports = {
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      { 
        test: /\.css$/, 
        loader: "style-loader!css-loader" 
      },
      { test: /\.png$/, use: [{ loader: 'file-loader', options: {} }] }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Volunteer Checkin',
      inject: true,
      template: 'src/index.html',
      filename: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {from:'src/images',to:'images'} 
    ])
  ],
  devServer: {
    contentBase: __dirname + '/dist',
    compress: true,
    port: 9000,
    historyApiFallback: true,
    host: '0.0.0.0'
  }
}
