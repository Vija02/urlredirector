var server = require('./lib/server'),
	controller = require('./lib/controller');

// Setup routes
require('./lib/router')(server, controller);

// Start listening
var port = process.env.PORT || 3000;
server.listen(port);
console.log("Server listening on port " + port);
