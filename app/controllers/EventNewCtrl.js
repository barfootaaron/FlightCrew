"use strict";

app.controller('EventNewCtrl', function($scope, $location, AuthFactory, EventFactory){
console.log("EventNewCtrl");

	let user = AuthFactory.getUser();

	$scope.title = "New Event";
	$scope.btnText = "Submit";

	$scope.newEvent = {
		uid: user,
		title: ""
	};
    console.log("$scope.newEvent", $scope.newEvent);

	$scope.addNewEvent = function () {
        console.log("add new Event");
       EventFactory.postNewEvent($scope.newEvent)
        .then(function(response) {
        	$location.url("events/list");//change this url to point to the correct spot
        });
        // $scope.newBoard.id = $scope.items.length;
        console.log("you added a new event", $scope.newEvent);
        // $scope.items.push($scope.newBoard);
        $scope.newEvent = {};
    };

});