const admin = require("firebase-admin");

export const Auth = {

	verifyToken: (token) => {
		return new Promise((resolve, reject) => {
			admin.auth().verifyIdToken(token).then((decoded) => {
				resolve(decoded);
			}).catch((err) => {
				reject(err);
			});
		});
	}

};
