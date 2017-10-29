import * as admin from 'firebase-admin';

const serviceAccount = require('aloner-firebase-firebase-adminsdk-nr6ot-5e3976c50f.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://aloner-firebase.firebaseio.com"
});
