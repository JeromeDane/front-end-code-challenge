var express     = require('express');
var path        = require('path');
var _           = require('lodash');
var ip          = require('ip');
var bodyParser  = require('body-parser');
var browserify  = require('connect-browserify');
var deamdify    = require('deamdify');

var locations   = require('./routes/locations');
var hotels      = require('./routes/hotels');

var app = express();
var publicPathName = 'public';
var publicPath = path.join(__dirname, publicPathName);

app.use('/main.js', browserify.serve({
  entry: path.join(publicPath, 'main.js'),
  watch: true,
  transforms: [deamdify],
  debug: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicPath));

app.use('/api/locations', locations);
app.use('/api/hotels', hotels);

var server = app.listen(9696, function () {

  var host = ip.address();
  var port = server.address().port;

  console.log('Server listening at http://localhost:%s and http://%s:%s', port, host, port);

});
