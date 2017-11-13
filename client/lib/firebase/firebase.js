let firebase = require('firebase');

const config = {
	apiKey: "AIzaSyBBlMxoUFYISp1HZ11GB9AUM5fBTpuDtjc",
	authDomain: "aloner-firebase.firebaseapp.com",
	databaseURL: "https://aloner-firebase.firebaseio.com",
	projectId: "aloner-firebase",
	storageBucket: "aloner-firebase.appspot.com",
	messagingSenderId: "1035212202971"
};

firebase.initializeApp(config);
