# HubSpokeSocket
Hub and Spokes Model for Web Applications using Socket.io

This tool allows for you to easily communicate across windows, web browsers, devices, and on with a simple API.

## Getting Started
This tool is (hopefully) easy to use. Be sure to launch the server, create a hub, note the id it generates, and pass it to any number of spokes on creation. Once both are inatilized, you can pass Hub.state = {object} or Spoke.state={object};

## Server
The server does little but bounce events back. Run it with `node server.js`
It runs on port 3001.

## Client
The Client consists of the Hub and Spoke objects.

Both require that the server is running, and the address is passed as the last/only argument.

For both, you can use `{the hub or spoke object}.callback = {callback function}` to callback on updating the state from the other component.

Updating state is done by `{the hub or spoke object}.state = {object of any sort*}`

The Hub keeps track of the last spoke state passed in {the hub object}.state, and each spoke's last update in {the hub object}.spokes{spoke prefix}

Use of .state and .spokes allows flexibility on how to expect communication and interaction.

\* We haven't tested compatibility exotic types, so be careful!

### Hub
The hub communicates with its spokes, bidirectionally.

Initalize like `new Hub('string of server host path and port')`

The Hub has a quazi random *fundamental* value {Hub object}.id which needs to be passed to any spokes the Hub wants to communicate with.
### Spoke
The spokes communicate with their respective hub, bidirectionally. Spokes do not communicate with other spokes.

Initalize like `new Spoke({hub object}.id, 'string identifier for this spoke', 'string of server host path and port')`

The spoke id is the hub's id and the string identifier appeneded with a hypen. For an example, if a Hub has id of 5909, then the spoke may have id of 5909-d.
