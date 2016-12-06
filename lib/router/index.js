module.exports = function (server, controller) {
	server.post('/createLink', controller.createLink);
	app.get('/:url', function(req, res){
		res.send('searching ' + req.params.url);
	});
	server.get('*', function(req, res){
		res.send('Error', 404);
	});
};
