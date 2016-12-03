"use strict";
const path = require('path');

exports.renderIndex = function (req, res) {
	let file = path.join(__dirname, '../../public/index.html');
	res.sendFile(file);
};
