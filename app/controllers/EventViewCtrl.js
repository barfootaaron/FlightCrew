"use strict";

app.controller("EventViewCtrl", function ($scope, $routeParams, EventFactory, AuthFactory, $location) {
 
	$scope.events = [];

	let user = AuthFactory.getUser();

	EventFactory.getEvents(user)
	.then( function(eventList) {
		$scope.events = eventList;

		$scope.selectedEvent = $scope.events.filter( function(event) {
			return event.id === $routeParams.eventId;
		})[0];

	$scope.addEvent = function(){
		let newEvent = $scope.selectedEvent;

		newEvent.uid = user;
		newEvent.id = undefined;
		EventFactory.postNewEvent(newEvent);
	};

	$scope.eventDelete = function(eventId) {
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
