var server = require('http').createServer();
var io = require('socket.io')(server);

function Server(){
  io.on('connection', function(client){
    client.on('event', function(data){
      socket.emit("event", data);
    });
    client.on('disconnect', function(){});
  });
  server.listen(3000);
}

module.exports = Server;
