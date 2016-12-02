var express = require('express'),
	config = require('./config'),
	server;

// Create the HTTP server (Express)
server = express();

// Apply the configuration
config.applyConfiguration(server);

// Export the server
module.exports = server;
