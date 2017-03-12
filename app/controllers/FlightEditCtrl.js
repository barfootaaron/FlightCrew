"use strict";

app.controller("FlightEditCtrl", function($scope, $location, $routeParams, FlightFactory, AuthFactory){

  let user = AuthFactory.getUser();

  $scope.title = "Edit Flight";
  $scope.btnText = "Update";
  $scope.newFlight = {};

  FlightFactory.getSingleFlight($routeParams.flightId)
  .then( function successCallback(response){
     console.log("getSingleSongresponse", response);
      $scope.newFlight = response;
  });
    
  $scope.addNewFlight = function(){
    FlightFactory.updateFlight($routeParams.flightId, $scope.newFlight)
    .then( function successCallback(response) {
      console.log(response);
      $location.url("/flights/list");
    });
  };
});