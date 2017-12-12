// External libraries
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var express = require('express');
// #####################
// ##### IMPORTANT #####
// removed <code>cors</code> usage
// ##### /IMPORTANT ####
// #####################

// Local files
var config = require('./webpack.config.js');

if (process.env.NODE_ENV === 'dev-server') {
  // = DEV =
  // This stands up the webpack-dev-server
  // with Hot Module Reloading enabled.

  // The following is needed in order for
  // Hot Module Reloading to work.
  config.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server');

  // #########################################
  // ############## IMPORTANT ################
  // Removed <code>API_URL</code> plugin injection here
  // ############## /IMPORTANT ###############
  // #########################################

  // Initiate webpack-dev-server with the
  // config we created in <code>webpack.config.js</code>
  var compiler = webpack(config);

  // #########################################
  // ############## IMPORTANT ################
  // Added <code>proxy</code> configuration for API fix
  var server = new webpackDevServer(compiler, {
    hot: true,
    proxy: {
      '/': {
        target: 'http://localhost:8081',
        secure: false
      }
    }
  });
  // ############## /IMPORTANT ###############
  // #########################################

  server.listen(8080);
} else if (process.env.NODE_ENV === 'dev-api') {
  // = DEV =
  // This stands up the express.js API
  var app = express();

  // #####################
  // ##### IMPORTANT #####
  // removed <code>cors</code> usage
  // ##### /IMPORTANT ####
  // #####################

  app.listen(8081, function () {
    console.log('API is up!')
  });
} else {
  // = PROD =
  // This is here for simplicity's sake,
  // in a real-world application none of
  // the development code should be copied
  // over to the production server.
  var app = express();

  // We serve the bundle folder, which
  // should contain an <code>index.html</code> and
  // a <code>bundle.js</code> file only.
  app.use('/', express.static('bundle'));

  app.listen(8080, function () {
    console.log('Both front-end and API are up!')
  });
}
