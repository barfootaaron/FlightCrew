"use strict";

app.controller("EventViewCtrl", function ($scope, $routeParams, EventFactory, AuthFactory, $location) {
	
	// $scope.potato = true;
	console.log("it's loading the right ctrl Event View");
 
	$scope.events = [];
	console.log($routeParams.event);

	let user = AuthFactory.getUser();

	EventFactory.getEvents(user)
	.then( function(eventList) {
		$scope.events = eventList;

		$scope.selectedEvent = $scope.events.filter( function(event) {
			return event.id === $routeParams.eventId;
		})[0];

		// if (user === $scope.selectedFlight.uid) {
		// 	$scope.isPinned = true;
		// } else {
		// 	$scope.isPinned = false;
		// }

	// 	$scope.isPinned	= user === $scope.selectedFlight.uid;
	

	$scope.addEvent = function(){
		let newEvent = $scope.selectedEvent;

		newEvent.uid = user;
		newEvent.id = undefined;
		EventFactory.postNewEvent(newEvent);
	};

	$scope.eventDelete = function(eventId) {
      console.log("delete this event", eventId);
      EventFactory.deleteEvent(eventId)
      .then( function(response) {
         EventFactory.getEvents(user).then( function(eventList) {
            $scope.events = eventList;
            $location.url("/events/list");
         });
      });

	$scope.editEvent = function(){
		$location.url("/events/:eventId/edit");

			};
		};
	});
});
