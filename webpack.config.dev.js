const path = require('path');
const merge = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const common = require('./webpack.config.js');

module.exports = merge.merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [new ReactRefreshWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.[jt]sx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
          },
        },
      },
    ],
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      env: 'development',
      apiUrl: 'http://localhost:3333',
    }),
  },
});
