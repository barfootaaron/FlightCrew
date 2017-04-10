"use strict";

app.controller('EventNewCtrl', function($scope, $location, AuthFactory, EventFactory){

	let user = AuthFactory.getUser();
	$scope.title = "Add New Event";
	$scope.btnText = "Add Event";
	$scope.newEvent = {
		uid: user,
		title: ""
	};

	$scope.addNewEvent = function () {
       EventFactory.postNewEvent($scope.newEvent)
        .then(function(response) {
        	$location.url("events/list");
        });
        $scope.newEvent = {};
        Materialize.toast("New event added successfully", 4000); 
    };

});