
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var post = require('./routes/post');
var http = require('http');
var path = require('path');
var moment = require('moment');


var ws = require('websocket.io');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/posts', post.create);

var server = http.createServer(app);
var socket = ws.attach(server);


socket.on('connection', function(client) {
  console.log('websocket connected');
  client.on('message', function(message) {
    
    console.log('websocket message: ' + message);
    var m = JSON.parse(message);
    m.date = moment().format('YYYY/MM/DD HH:mm:ss');

    console.log('message to be sent: ' + JSON.stringify(m));
    socket.clients.forEach(function(client) {
      client.send(JSON.stringify(m));
    });
  });
});

socket.on('close', function(client) {
  console.log('websocket closed');
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
