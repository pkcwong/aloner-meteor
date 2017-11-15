import { Messaging } from "../../methods/messaging";

Router.map(function() {
	this.route('messaging', {
		path: '/api/messaging',
		where: 'server',
		action: function() {
			console.log('/api/messaging');
			console.log(this.request.body);
			this.response.writeHead(200, {'Content-Type': 'application/json'});
			switch (this.request.body['method']) {
				case 'update':
					Messaging.update(this.request.body).then((res) => {
						console.log(res);
						this.response.end(JSON.stringify(res));
					}).catch((err) => {
						console.log(err);
						this.response.end(JSON.stringify(err));
					});
					break;
			}
		}
	});
});
