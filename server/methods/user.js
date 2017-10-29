const admin = require("firebase-admin");

export const User = {

	dump: (token) => {
		return new Promise((resolve, reject) => {
			admin.auth().verifyIdToken(token).then((decoded) => {
				admin.database().ref('user/' + decoded.uid).once('value').then((snapshot) => {
					resolve(snapshot.val());
				}).catch((err) => {
					reject(err);
				});
			}).catch((err) => {
				reject(err);
			});
		});
	}

};
