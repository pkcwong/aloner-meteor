const admin = require("firebase-admin");

import {credentials} from "./aloner-firebase-firebase-adminsdk-nr6ot-5e3976c50f";

admin.initializeApp({
	credential: admin.credential.cert(credentials),
	databaseURL: "https://aloner-firebase.firebaseio.com"
});
