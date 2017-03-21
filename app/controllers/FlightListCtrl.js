"use strict";


app.controller("FlightListCtrl", function($scope, FlightFactory, AuthFactory, EventFactory, SearchTermData, $routeParams, $location) {
// console.log("this is FlightListCtrl checking in");

// $scope.potato = false;


   $scope.heading = "My Flights";
   $scope.isLoggedIn = false;
	$scope.searchText = SearchTermData;
   let user = AuthFactory.getUser();

	FlightFactory.getFlights(user)
	.then( function(flightList) {
      console.log('flightList', flightList);
		$scope.flights = flightList;
	});

   // THIS IS STYLED AS THE "CHECK OFF BTN", BUT IT DOES THE SAME AS THE DELETE BUTTON ON FLIGHT DETIAIL VIEW
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
      FlightFactory.updateFlight(flightId)
      .then( function(response) {
         FlightFactory.getFlights(user)
         .then( function(flightList) {
            $scope.flights = flightList;
            $location.url("/flights/list");
            Materialize.toast("Flight Data Updated", 4000, "rounded");
         });
      });
   };

   // EventFactory.getEvents(user)
   // .then( function(eventList) {
   //    $scope.events = eventList;
   //    console.log('eventList', eventList);
   // });

});
