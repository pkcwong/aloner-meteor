Router.map(function() {
	this.route('post', {
		path: '/api/post',
		where: 'server',
		action: function() {
			this.response.writeHead(200, {'Content-Type': 'application/json'});
			this.response.end(JSON.stringify(this.request.body));
		}
	});
});
