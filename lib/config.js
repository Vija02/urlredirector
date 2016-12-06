var path = require('path'),
	express = require('express'),
	bodyParser = require("body-parser");

// Basic Config tested for express 4.x
var applyConfiguration = function (server) {
	var app = server;

	// Parse the body
	app.use(bodyParser.urlencoded({ extended: false }));

	// Parse application/json
	app.use(bodyParser.json());

}

exports.applyConfiguration = applyConfiguration;
