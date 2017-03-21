"use strict";

app.controller("FlightViewCtrl", function ($scope, $routeParams, FlightFactory, AuthFactory, $location) {
	
	// $scope.potato = true;
 
	$scope.flights = [];
	// console.log($routeParams.flightId);

	let user = AuthFactory.getUser();

	FlightFactory.getFlights(user)
	.then( function(flightList) {
		$scope.flights = flightList;

		$scope.selectedFlight = $scope.flights.filter( function(flight) {
			return flight.id === $routeParams.flightId;
		})[0];

		// if (user === $scope.selectedFlight.uid) {
		// 	$scope.isPinned = true;
		// } else {
		// 	$scope.isPinned = false;
		// }

	// 	$scope.isPinned	= user === $scope.selectedFlight.uid;
	
	$scope.flightUpdate = function(flightId) {
   FlightFactory.updateFlight(flightId)
      .then( function(response) {
         FlightFactory.getFlights(user)
         .then( function(flightList) {
            $scope.flights = flightList;
            console.log('flightUPDATE ALIVE', flightId);
            // $location.url("/flights/:flightId");
            Materialize.toast("Flight Stats Updated", 4000, "rounded");
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
      // console.log("delete this flight", flightId);
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
