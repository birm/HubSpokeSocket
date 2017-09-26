var Client = require('./Client.js');
console.log("hi")
// set up
var H = new Client.Hub('localhost:3001');
var S = new Client.Spoke(H.id, 's', 'localhost:3001');

// push value from hub to spoke
H.state = "testing"

console.log("H.state")
console.log(H.state);

spoke_check = function(){
  console.log(S.state);
}
setTimeout(spoke_check, 2000);
