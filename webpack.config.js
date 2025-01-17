const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/script2.js',  // Entry point for your JS
  output: {
    path: path.resolve(__dirname, 'dist'),  // Output folder for bundled files
    filename: 'bundle.js',  // Output JS file
  },
  module: {
    rules: [
      {
        test: /\.css$/,  // For handling CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,  // For handling JS files (transpile with Babel)
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',  // Use the index.html in /public
    }),
  ],
  mode: 'development',  // Set mode to 'production' for production builds
};