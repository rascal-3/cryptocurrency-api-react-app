const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
require('whatwg-fetch');

const publidDir = path.join(__dirname, '/public');
module.exports = [
  {
    entry: [
      'whatwg-fetch',
      './src/index.jsx',
    ],
    output: {
      path: publidDir,
      publicPath: '/',
      filename: 'bundle.js',
    },
    module: {
      loaders: [{
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      }],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devServer: {
      historyApiFallback: true,
      contentBase: publidDir,

      // proxy: {
      //   '/bitflyer': {
      //     target: {
      //       host: 'localhost',
      //       protocol: 'http',
      //       port: 8080
      //     }
      //   }
      // },

      // proxy: {
      //   'https://api.bitflyer.jp/v1/board': {
      //      target: 'http://localhost:8080/bitflyer/board',
      //      secure: false,
      //   },
      //   '/v1/board': {
      //     target: 'https://api.bitflyer.jp/v1/board',
      //     secure: true,
      //   },
      // },
      //

      proxy: {
        '/api/bf/board': 'https://api.bitflyer.jp/v1/board',
      },
      historyApiFallback: true,
      watchOptions: { aggregateTimeout: 300, poll: 1000 },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With',
        // 'Access-Control-Allow-Credentials': 'true',
      },
    },
  },
  {
    entry: {
      style: './stylesheets/index.scss',
    },
    output: {
      path: publidDir,
      publicPath: '/',
      filename: 'bundle.css',
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' }),
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('bundle.css'),
    ],
  },
];
