const admin = require("firebase-admin");

export const Events = {

	/***
	 * API
	 * @returns {Promise}
	 */
	dump: () => {
		return new Promise((resolve, reject) => {
			admin.firestore().collection('events').get().then((snapshot) => {
				let documents = [];
				snapshot.forEach((doc) => {
					let packet = {};
					packet['_id'] = doc.id;
					documents.push(packet);
				});
				resolve(documents);
			}).catch((err) => {
				reject(err);
			});
		});
	},

	/***
	 * API
	 * @param json
	 * @returns {Promise}
	 */
	query: (json) => {
		return new Promise((resolve, reject) => {
			admin.firestore().collection('events').doc(json['_id']).get().then((doc) => {
				let packet = {};
				packet['owner'] = doc.data()['owner'];
				packet['description'] = doc.data()['description'];
				packet['_id'] = doc.id;
				resolve(packet);
			}).catch((err) => {
				reject(err);
			});
		});
	}

};