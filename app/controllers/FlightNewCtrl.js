'use strict';

app.controller("FlightNewCtrl", function($scope, FlightFactory, $location, AuthFactory, EventFactory) {

  let user = AuthFactory.getUser();
  let profileName = AuthFactory.getName();
  // console.log('User Name Display Name is: ', profileName);

  $scope.title = "Add a New Flight to track";
  $scope.btnText = "Add New Flight";
  $scope.newFlight = {
    uid: user,
    arrDay: "",
    arrMonth: "",
    arrYear: "2017",
    arrDate: "",
    airline: "",
    flightNumber: "",
    flightStatsId: "",
    depAirport: "",
    depTime: "",
    arrTime: "",
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
 

    FlightFactory.postNewFlight($scope.newFlight)
      .then(function(flightData) {
        $location.url("/flights/list");
        });
    });
    console.log("you added a new Flight to be tracked:", $scope.newFlight);

  };

 //  EventFactory.getEventList(user)
	// .then( function(eventList) {
	// 	$scope.events = eventList;
 //  });

});
