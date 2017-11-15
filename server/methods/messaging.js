let admin = require('firebase-admin');

export const Messaging = {

	/***
	 * API
	 * @param json
	 * @returns {Promise}
	 */
	update: (json) => {
		return new Promise((resolve, reject) => {
			admin.auth().verifyIdToken(json['token']).then((decoded) => {
				admin.firestore().collection('users').doc(decoded.uid).update({
					fcm: json['fcm']
				}).then(() => {
					resolve(json);
				}).catch((err) => {
					reject(err);
				})
			}).catch((err) => {
				reject(err);
			});
		});
	},

	broadcast: (topic, msg) => {
		return new Promise((resolve, reject) => {
			admin.messaging().sendToTopic(topic, {
				notification: {
					title: topic,
					body: msg
				}
			}).then((response) => {
				resolve(response);
			}).catch((err) => {
				reject(err);
			});
		});
	},

	target: (fcm, msg) => {
		return new Promise((resolve, reject) => {
			admin.messaging().sendToDevice(fcm, msg).then((response) => {
				resolve(response);
			}).catch((err) => {
				reject(err);
			});
		});
	}

};
