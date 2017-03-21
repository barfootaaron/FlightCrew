"use strict";

app.controller('EventNewCtrl', function($scope, $location, AuthFactory, EventFactory){
console.log("EventNewCtrl");

	let user = AuthFactory.getUser();

	$scope.title = "Add New Event";
	$scope.btnText = "Add Event";

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

        Materialize.toast("New event added successfully", 4000); 
    };

});