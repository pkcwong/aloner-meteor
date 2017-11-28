import { Events } from "../methods/events";

Meteor.methods({

	method: () => {
		return new Promise((resolve, reject) => {
			resolve(Events.query({'_id': 'CVDJvIBSB1CxopxivX34'}));
		})
	}

});
