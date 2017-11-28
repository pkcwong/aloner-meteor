import { Events } from "../methods/events";

Meteor.methods({

	method: (token) => {
		return new Promise((resolve, reject) => {
			Events.create({
				method: 'create',
				token: token,
				category: 'troll',
				description: 'wad da fak',
				location: 'somewhere',
				quota: 1,
				time: {
					start: 1000,
					end: 2000
				}
			}).then((res) => {
				resolve(res);
			}).catch((err) => {
				reject(err);
			});
		});
	}

});
