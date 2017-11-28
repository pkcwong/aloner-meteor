import { Events } from "../methods/events";

Meteor.methods({

	method: (token) => {
		return new Promise((resolve, reject) => {
			Events.enroll({
				token: token,
				_id: 'CVDJvIBSB1CxopxivX34'
			}).then((res) => {
				resolve(res);
			}).catch((err) => {
				reject(err);
			})
		})
	}

});
