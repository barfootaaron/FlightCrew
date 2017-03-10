"use strict";

app.controller('EventListCtrl', function($scope, $routeParams, EventFactory, AuthFactory){
	$scope.boards = [];
	console.log($routeParams.title);

	let user = AuthFactory.getUser();
	EventFactory.getEvents(user)
	.then( function(eventList) {
		$scope.events = eventList;

		$scope.selectedEvent = $scope.events.filter( function(events) {
			return events.uid === $routeParams.uid;
		})[1];
	});

});