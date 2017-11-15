let admin = require('firebase-admin');

export const User = {

	/***
	 * API
	 * @param json
	 * @returns {Promise}
	 */
	query: (json) => {
		return new Promise((resolve, reject) => {
			admin.firestore().collection('users').doc(json['uid']).get().then((doc) => {
				let packet = {};
				packet['firstname'] = doc.data()['firstname'];
				packet['lastname'] = doc.data()['lastname'];
				packet['_id'] = doc.id;
				resolve(packet);
			}).catch((err) => {
				reject(err);
			});
		});
	}

};
