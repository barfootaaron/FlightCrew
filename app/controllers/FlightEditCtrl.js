"use strict";

app.controller("FlightEditCtrl", function($scope, $location, $routeParams, FlightFactory, AuthFactory){

  let user = AuthFactory.getUser();

  $scope.title = "Edit Flight";
  $scope.btnText = "Update";
  $scope.newFlight = {};

  FlightFactory.getSingleFlight($routeParams.flightId)
  .then( function successCallback(response) {
      $scope.newFlight = response;
  });
    
  $scope.addNewFlight = function() {
    FlightFactory.updateFlightInFirebase($routeParams.flightId, $scope.newFlight)
    .then( function successCallback(response) {
      Materialize.toast("You've successfully edited a flight", 4000, "rounded"); 
      $location.url("/flights/list");
    });
  };
});