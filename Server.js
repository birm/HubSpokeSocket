var server = require('http').createServer();
var io = require('socket.io')(server);

function Server(){
  io.on('connection', function(client){
    client.on('hubEvent', function(data){
      io.emit("hubEvent", data);
    });
    client.on('spokeEvent', function(data){
      io.emit("spokeEvent", data);
    });
    client.on('disconnect', function(){});
  });
  server.listen(3001);
}

Server()

module.exports = Server;
