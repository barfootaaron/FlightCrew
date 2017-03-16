"use strict";

app.controller('EventNewCtrl', function($scope, $location, AuthFactory, EventFactory){
console.log("EventNewCtrl");

	let user = AuthFactory.getUser();

	$scope.title = "New Event";
	$scope.btnText = "Add New Event";

	$scope.newEvent = {
		uid: user,
		title: ""
	};
    console.log("$scope.newEvent", $scope.newEvent);

	$scope.addNewEvent = function () {
        console.log("add new Event");
       EventFactory.postNewEvent($scope.newEvent)
        .then(function(response) {
        	$location.url("events/list");
        });
        console.log("you added a new event", $scope.newEvent);
        $scope.newEvent = {};
    };

});