Router.map(function() {
	this.route('get', {
		path: '/api/get',
		where: 'server',
		action: function() {
			this.response.writeHead(200, {'Content-Type': 'application/json'});
			this.response.end(JSON.stringify(this.params.query));
		}
	});
});
