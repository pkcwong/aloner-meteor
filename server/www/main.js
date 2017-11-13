import { Broadcast } from "../methods/broadcast";

Meteor.methods({

	method: (json) => {
		return new Promise((resolve, reject) => {
			Broadcast.dump(json).then((res) => {
				resolve(res);
			}).catch((err) => {
				reject(err);
			});
		})
	}

});
