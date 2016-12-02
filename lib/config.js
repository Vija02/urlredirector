var path = require('path'),
	express = require('express'),
	bodyParser = require("body-parser");

// Basic Config tested for express 4.x
var applyConfiguration = function (server) {
	var app = server,
		rootDir = path.resolve(__dirname, '..');

	app.use(function (req, res, next) {
		// Parse the body
		app.use(bodyParser.urlencoded({ extended: false }));

		// Parse application/json
		app.use(bodyParser.json())

		// Serve static content from "public" directory
		app.use(express.static(rootDir + '/public'));

		next();
	});
}

exports.applyConfiguration = applyConfiguration;
