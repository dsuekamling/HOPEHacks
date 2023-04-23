const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.hbs$/,
        use: {
          loader: 'handlebars-loader',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './templates/views/index.hbs',
      filename: 'index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: './templates/views/about.hbs',
      filename: 'about.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: './templates/views/contact.hbs',
      filename: 'contact.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: './templates/views/resources.hbs',
      filename: 'resources.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: './templates/views/404.hbs',
      filename: '404.html',
      chunks: ['main'],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
  ],
  devServer: {
    contentBase: './public',
    publicPath: '/',
    port: 8000,
    historyApiFallback: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
