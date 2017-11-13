let firebase = require('firebase');

Router.route('/', function() {
	this.render('main');
});

Template.main.onRendered(() => {
	firebase.auth().signInWithEmailAndPassword('test@aloner.com', 'abcd1234').then(() => {
		console.log(firebase.auth().currentUser);
		firebase.auth().currentUser.getIdToken(true).then((token) => {
			console.log(token);
			Meteor.call('method', {token: token}, (err, res) => {
				console.log(res);
			});
		});
	}).catch((err) => {

	});
});
