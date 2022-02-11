const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // bundling mode
  mode: 'production',

  // entry files
  entry: path.resolve(__dirname, 'src', 'index.tsx'),

  // output bundles (location)
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/',
  },

  // file resolutions
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      filename: 'index.html',
      inject: 'body',
    }),

    // Copy folder assets to assets build
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'public', 'assets'), to: 'assets' },
      ],
    }),
  ].filter(Boolean),

  // loaders
  module: {
    rules: [
      {
        test: /\.[jt]sx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [].filter(Boolean),
          },
        },
      },
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true,
              experimentalWatchApi: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(svg)$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['url-loader'],
      },
      {
        test: /\.(jpg|png|gif|pdf|ico|jpeg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
    ],
  },
};
