"use strict";

app.controller("FlightViewCtrl", function ($scope, $routeParams, FlightFactory, AuthFactory, $location) {
	$scope.flights = [];

	let user = AuthFactory.getUser();

	FlightFactory.getFlights(user)
	.then( function(flightList) {
		$scope.flights = flightList;
		$scope.selectedFlight = $scope.flights.filter( function(flight) {
			return flight.id === $routeParams.flightId;
		})[0];

	
	$(document).ready(function(){
      $('.tooltipped').tooltip({delay: 500});
      });
	

	$scope.flightUpdate = function(flightId) {
      FlightFactory.updateFlightStats(flightId)
         .then( function(flightData) {
            $scope.editedFlight = flightId;
    
      FlightFactory.updateFlightInFirebase($routeParams.flightId, $scope.editedFlight)
         .then( function successCallback (response) {
            Materialize.toast("Flight Data Updated", 4000, "rounded");
         });
      });
   };

	$scope.addFlight = function(){
		let newFlight = $scope.selectedFlight;
		newFlight.uid = user;
		newFlight.id = undefined;
		FlightFactory.postNewFlight(newFlight);
	};

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

	$scope.editFlight = function(){
		$location.url("/flights/:flightId/edit");
			};
		};
	});
});
