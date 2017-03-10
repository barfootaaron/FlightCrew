'use strict';

app.controller("FlightNewCtrl", function($scope, FlightFactory, $location, AuthFactory, EventFactory) {

  let user = AuthFactory.getUser();
  let profileName = AuthFactory.getName();
  console.log('User Name Display Name is: ', profileName);

  $scope.title = "Add a New Flight to track";
  $scope.btnText = "Add New Flight";
  $scope.newFlight = {
    eventId: "",
    uid: user,
    date: "",
    airline: "",
    flightNumber: "",
    flightStatsId: "",
    depAirport: "",
    arrAirport: "",
    numPax: "",
    firstContactName: "",
    firstContactNum: "",
    secondContactName: "",
    secondContactNum: ""
  };


  $scope.addNewFlight = function() {
    console.log("add new flight");
    FlightFactory.postNewFlight($scope.newFlight)
    .then(function(response) {
      $location.url("/flights/list");
    });
    console.log("you added a new Flight:", $scope.newFlight);
    $scope.newFlight = {};
  };

 //  EventFactory.getEventList(user)
	// .then( function(eventList) {
	// 	$scope.events = eventList;
 //  });

});
