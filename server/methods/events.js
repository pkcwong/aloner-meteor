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
				packet['category'] = doc.data()['category'];
				packet['location'] = doc.data()['location'];
				packet['time'] = doc.data()['time'];
				packet['_id'] = doc.id;
				packet['quota'] = doc.data()['quota'];
				packet['enrollment'] = [];
				admin.firestore().collection('enrollment').where('event', '==', json['_id']).get().then((snapshot) => {
					snapshot.forEach((enroll) => {
						let item = {};
						item['uid'] = enroll.data()['uid'];
						item['confirmed'] = enroll.data()['confirmed'];
						item['approved'] = enroll.data()['approved'];
						packet['enrollment'].push(item);
					});
					resolve(packet);
				});
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
	category: (json) => {
		return new Promise((resolve, reject) => {
			admin.firestore().collection('events').where('category', '==', json['category']).get().then((snapshot) => {
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
	create: (json) => {
		return new Promise((resolve, reject) => {
			admin.auth().verifyIdToken(json['token']).then((decoded) => {
				admin.firestore().collection('events').add({
					category: json['sport'],
					description: json['description'],
					location: json['location'],
					owner: decoded.uid,
					quota: json['quota'],
					time: {
						start: json['time']['start'],
						end: json['time']['end']
					}
				}).then((_id) => {
					admin.firestore().collection('enrollment').add({
						approved: true,
						confirmed: true,
						event: _id,
						uid: decoded.uid
					}).then(() => {
						resolve({});
					}).catch((err) => {
						reject(err);
					});
				}).catch((err) => {
					reject(err);
				});
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
	enroll: (json) => {
		return new Promise((resolve, reject) => {
			admin.auth().verifyIdToken(json['token']).then((decoded) => {
				admin.firestore().collection('enrollment').where('event', '==', json['_id']).where('uid', '==', decoded.uid).get().then((snapshot) => {
					if (snapshot.empty) {
						admin.firestore().collection('enrollment').add({
							approved: false,
							confirm: true,
							event: json['_id'],
							uid: decoded.uid
						}).then(() => {
							resolve({});
						}).catch((err) => {
							reject(err);
						});
					} else {
						snapshot.forEach((doc) => {
							admin.firestore().collection('enrollment').doc(doc.id).update({
								confirm: !doc.data()['confirm']
							}).then(() => {
								resolve({});
							}).catch((err) => {
								reject(err);
							});
						});
					}
				}).catch((err) => {
					reject(err);
				});
			}).catch((err) => {
				reject(err);
			});
		});
	}

};
