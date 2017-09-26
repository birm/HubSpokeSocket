var Client = require('./Client.js');
var Server = require('./Server.js');

// set up
var H = new Client.Hub('localhost:3001');
var S = new Client.Spoke(H.id, 's', 'localhost:3001');

Server();

// push value from hub to spoke
H.state = "testing"

function test_pass1(){
  return H.state==S.state;
}

setTimeout(test_pass1,2000);
