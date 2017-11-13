import { Broadcast } from "../../methods/broadcast";

Router.map(function() {
	this.route('broadcast', {
		path: '/api/broadcast',
		where: 'server',
		action: function() {
			console.log('/api/broadcast');
			console.log(this.request.body);
			this.response.writeHead(200, {'Content-Type': 'application/json'});
			switch (this.request.body['method']) {
				case 'dump':
					Broadcast.dump(this.request.body).then((res) => {
						console.log(res);
						this.response.end(JSON.stringify(res));
					}).catch((err) => {
						console.log(err);
						this.response.end(JSON.stringify(err));
					});
					break;
				case 'send':
					Broadcast.send(this.request.body).then((res) => {
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
