let admin = require("firebase-admin");

import { Messaging } from "./messaging";

export const Broadcast = {

	/***
	 * API
	 * @param json
	 * @returns {Promise.<T>|*|Promise}
	 */
	dump: (json) => {
		return new Promise((resolve, reject) => {
			admin.firestore().collection('broadcasts').where('stamp', '>', json['createdAt']).get().then((snapshot) => {
				let documents = [];
				snapshot.forEach((doc) => {
					let packet = {};
					packet['_id'] = doc.id;
					packet['text'] = doc.data()['msg'];
					packet['createdAt'] = doc.data()['stamp'];
					packet['user'] = {};
					packet['user']['_id'] = doc.data()['uid'];
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
	send: (json) => {
		return new Promise((resolve, reject) => {
			admin.auth().verifyIdToken(json['token']).then((decoded) => {
				admin.firestore().collection('broadcasts').add({
					uid: decoded.uid,
					msg: json['text'],
					stamp: new Date().getTime()
				}).then(() => {
					Messaging.broadcast('broadcast', json['text']).then((res) => {
						resolve({});
					}).catch((err) => {
						console.error(err);
					});
				}).catch((err) => {
					reject(err);
				});
			}).catch((err) => {
				reject(err);
			});
		});
	}

};
