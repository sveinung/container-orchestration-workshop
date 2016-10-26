var express = require('express');
var proxy = require('express-http-proxy');
var app = express();

app.use('/backend', proxy('localhost:8080', {
  forwardPath: function(req, res) {
    return '/backend' + req.url;
  }
}));
app.use('/', express.static(__dirname + '/frontend/src'));

app.listen(3000, function() { console.log('listening'); });

