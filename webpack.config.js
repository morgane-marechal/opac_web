const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'], // permet d'importer sans extensions
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // transpile JS/JSX avec Babel
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML de base
    }),
  ],
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
  },
  mode: 'development',
};
