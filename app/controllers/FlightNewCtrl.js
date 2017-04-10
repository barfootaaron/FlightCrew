'use strict';

app.controller("FlightNewCtrl", function($scope, FlightFactory, $location, AuthFactory, EventFactory) {

  let user = AuthFactory.getUser();
  let profileName = AuthFactory.getName();

  $scope.title = "Add New Flight";
  $scope.btnText = "Add Flight";
  $scope.newFlight = {
    uid: user,
    status: "Awaiting Takeoff",
    arrDay: "",
    arrMonth: "",
    arrYear: "2017",
    arrDate: "",
    airlineName: "",
    airlineCode: "",
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
    FlightFactory.getNewFlightStats($scope.newFlight)
      .then(function(flightData) {

    FlightFactory.postNewFlight($scope.newFlight)
      .then(function(flightData) {
        $location.url("/flights/list");
        });
    });
     Materialize.toast("New flight added successfully", 4000, "rounded"); 
  };

});
