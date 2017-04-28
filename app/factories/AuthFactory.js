"use strict";

app.factory('AuthFactory', function(){


	let currentUser = null;
	let currentName = null;

	let createUser = function(userObj){
		return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
		.catch( function(error){
			let errorCode = error.code;
			let errorMessage = error.message;
		});
	};

	let loginUser = function(userObj) {
		return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
		.catch( function(error){
			let errorCode = error.code;
			let errorMessage = error.message;
		});
	};

	let logoutUser = function(){
		return firebase.auth().signOut();
	};

	let isAuthenticated = function (){
		return new Promise ( (resolve, reject) => {
			firebase.auth().onAuthStateChanged( (user) => {
				if (user){
					currentUser = user.uid;
					currentName = user.displayName;
					resolve(true);
				}else {
					resolve(false);
				}
			});
		});
	};

	let getUser = function(){
		return currentUser;
	};

	let getName = function(){
		return currentName;
	};

	let provider = new firebase.auth.GoogleAuthProvider();

	let authWithProvider= function(){
    	return firebase.auth().signInWithPopup(provider);
  	};

	return {createUser, loginUser, logoutUser, isAuthenticated, getUser, authWithProvider, getName};


});