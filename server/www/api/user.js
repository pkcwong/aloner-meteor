import { User } from "../../methods/user";

Router.map(function() {
	this.route('user', {
		path: '/api/user',
		where: 'server',
		action: function() {
			console.log('/api/user');
			console.log(this.request.body);
			this.response.writeHead(200, {'Content-Type': 'application/json'});
			User.query(this.request.body).then((res) => {
				console.log(res);
				this.response.end(JSON.stringify(res));
			}).catch((err) => {
				console.log(err);
				this.response.end(JSON.stringify(err));
			});
		}
	});
});
