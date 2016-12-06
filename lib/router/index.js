module.exports = function (server, controller) {
	server.post('/createLink', controller.createLink);
};
