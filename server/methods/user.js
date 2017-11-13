let admin = require("firebase-admin");

export const User = {

	dump: (token) => {
		return new Promise((resolve, reject) => {
			admin.auth().verifyIdToken(token).then((decoded) => {
				admin.firestore().collection('users').doc(decoded.uid).get().then((snapshot) => {
					resolve(snapshot.data());
				});
			}).catch((err) => {
				reject(err);
			});
		});
	},

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
