import { Messaging } from "../methods/messaging";

Meteor.methods({

	method: () => {
		return new Promise((resolve, reject) => {
			Messaging.broadcast('test message').then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err);
			})
		})
	}

});
