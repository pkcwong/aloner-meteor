const admin = require("firebase-admin");

export const Event = {

	create: (token, title, category, description) => {
		return new Promise((resolve, reject) => {
			admin.auth().verifyIdToken(token).then((decoded) => {
				admin.database().ref('event').push().set({
					'title': title,
					'category': category,
					'description': description,
					'owner': decoded.uid,
					'creation_date': new Date().toISOString()
				}).then(() => {
					resolve(decoded.uid);
				}).catch((err) => {
					reject(err);
				});
			});
		});
	},

	enroll: (token, event) => {
		return new Promise((resolve, reject) => {
			admin.auth().verifyIdToken(token).then((decoded) => {
				admin.database().ref('event').child(event).child('enrollment').push().set({
					'uid': decoded.uid,
					'approved': false,
					'timeslot': {
						'lower': '00:00:00',
						'upper': '00:00:00',
					}
				}).then(() => {
					resolve(decoded.uid);
				}).catch((err) => {
					reject(err);
				});
			});
		});
	}

};
