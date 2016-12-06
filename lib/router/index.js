module.exports = function (server, controller) {
	server.post('/createLink', controller.createLink);
	server.get('/:url', controller.getLink);
	server.get('*', function(req, res){
		res.redirect('/');
	});
};
