'use strict';

app.controller("FlightNewCtrl", function($scope, FlightFactory, $location, AuthFactory, EventFactory) {

  let user = AuthFactory.getUser();
  let profileName = AuthFactory.getName();
  // console.log('User Name Display Name is: ', profileName);

  $scope.title = "Add a New Flight to track";
  $scope.btnText = "Add New Flight";
  $scope.newFlight = {
    eventId: "",
    uid: user,
    date: "",
    airline: "",
    number: "",
    flightStatsId: "",
    depAirport: "",
    arrAirport: "",
    arrTerm: "",
    numPax: "",
    firstContactName: "",
    firstContactNum: "",
    secondContactName: "",
    secondContactNum: ""
  };

  $scope.addNewFlight = function() {
    console.log($scope.newFlight);
    FlightFactory.getNewFlightStats($scope.newFlight)
    .then(function(flightData) {
      $scope.newFlight.data = flightData.data;
      console.log('response.data', flightData.data);

    FlightFactory.postNewFlight($scope.newFlight)
    .then(function(response) {
      $location.url("/flights/list");
      });
    });
    console.log("you added a new Flight:", $scope.newFlight);
    $scope.newFlightData = {};
  };

 //  EventFactory.getEventList(user)
	// .then( function(eventList) {
	// 	$scope.events = eventList;
 //  });

});
