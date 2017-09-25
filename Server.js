var server = require('http').createServer();
var io = require('socket.io')(server);

function event_handle(data){
  pass;
}

io.on('connection', function(client){
  client.on('event', event_handle);
  client.on('disconnect', function(){});
});
server.listen(3000);
