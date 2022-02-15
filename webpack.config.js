const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const path = require('path');


module.exports = {
  entry: {
    //app: ['babel-polyfill', './src/main.js'],
    app: ['babel-polyfill', './src/main.js']
    //app: './src/main.js'
  },
    output: {
    //filename: "main.js",
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, "./dist"),
  },
  devtool:"cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      //{ test: /\.js$/, use: 'babel-loader' },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
    ]
  },
devServer: {
  contentBase: path.join(__dirname, "/dist"),
  host: '0.0.0.0',
  port: 7979,   
  public: '0.0.0.0:7979',
  disableHostCheck: true,   
  //  proxy: {
  //   "/api": {
  //     target: "http://rankanswer:8081",
  // }},
  // allowedHosts: [
  //   'localhost'
  // ],
  // headers: {
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  //   "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  // }

  //open: true,
  hot: true,
  //historyApiFallback: true,
},
  plugins: [
    new HtmlWebpackPlugin({
      template: './dist/index.html',
    }),
    //new HtmlWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    })
  ]
};