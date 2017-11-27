import { Events } from "../../methods/events";

Router.map(function() {
	this.route('events', {
		path: '/api/events',
		where: 'server',
		action: function() {
			console.log('/api/events');
			console.log(this.request.body);
			this.response.writeHead(200, {'Content-Type': 'application/json'});
			switch (this.request.body['method']) {
				case 'dump':
					Events.dump().then((res) => {
						console.log(res);
						this.response.end(JSON.stringify(res));
					}).catch((err) => {
						console.error(err);
						this.response.end(JSON.stringify(err));
					});
					break;
			}
		}
	});
});