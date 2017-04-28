"use strict";

app.factory("EventFactory", ($q, $http, FBCreds, AuthFactory) => {
	
	let getEvents = (user) => {
		let eventObj = [];

		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/events.json?orderBy="uid"&equalTo="${user}"`)
			.then((eventObject) => {
				let eventCollection = eventObject.data;
				Object.keys(eventCollection).forEach((key) => {
					eventCollection[key].id = key;
					eventObj.push(eventCollection[key]);
				});
				resolve(eventObj);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	let postNewEvent = (newEvent) => {
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/events.json`,
				JSON.stringify(newEvent))
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			})
			.catch((error) => {
				reject(error);
			});
		});

	};

	let deleteEvent = (eventId) => {
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/events/${eventId}.json`)
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			});
		});

	};

	let getSingleEvent = (eventId) => {
		return $q(function(resolve, reject){
			$http.get(`${FBCreds.databaseURL}/events/${eventId}.json`)
			.then(function (eventObject) {
				resolve(eventObject.data);
			})
			.catch(function(error){
				reject(error);
			});
		});
	};

	let updateEvent = (eventId, editedEvent) => {
		return $q(function(resolve, reject){
			$http.patch(`${FBCreds.databaseURL}/event/${eventId}.json`, 
				angular.toJson(editedEvent))
			.then(function(ObjectFromFirebase) {
				resolve(ObjectFromFirebase);
			})
			.catch(function(error){
				reject(error);
			});
		});
	};


	return {getEvents, postNewEvent, deleteEvent, getSingleEvent, updateEvent};
});
