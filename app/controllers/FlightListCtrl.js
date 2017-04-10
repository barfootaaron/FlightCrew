"use strict";

app.controller("FlightListCtrl", function($scope, FlightFactory, AuthFactory, EventFactory, SearchTermData, $routeParams, $location) {


   $scope.heading = "My Flights";
   $scope.isLoggedIn = false;
	$scope.searchText = SearchTermData;
   $scope.timeNow = new Date();
   $scope.timeNow.toISOString();
   $scope.editedFlight = {}; 

   let user = AuthFactory.getUser();

	FlightFactory.getFlights(user)
	.then( function(flightList) {
		$scope.flights = flightList;
	});

   // BTN TO REMOVE FLIGHT ON FLIGHT CARD //
   // DOES THE SAME AS THE DELETE BUTTON ON FLIGHT DETAIL VIEW //
   $scope.flightDelete = function(flightId) {
      FlightFactory.deleteFlight(flightId)
      .then( function(response) {
         FlightFactory.getFlights(user)
         .then( function(flightList) {
            $scope.flights = flightList;
            $location.url("/flights/list");
            Materialize.toast("Flight Removed", 4000, "rounded");
         });
      });
   };

   $scope.flightUpdate = function(flightId) {
      FlightFactory.updateFlightStats(flightId)
         .then( function(flightData) {
            $scope.editedFlight = flightId;
    
      FlightFactory.updateFlightInFirebase($routeParams.flightId, $scope.editedFlight)
         .then( function successCallback (response) {
         Materialize.toast("Flight Data Updated", 4000, "rounded");
         $location.url("/flights/list");
         });
      });
   };

});
