module.exports = function (server, controller) {
	server.get('/', controller.renderIndex);
};
