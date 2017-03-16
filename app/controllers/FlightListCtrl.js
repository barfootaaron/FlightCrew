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
		$scope.flights = flightList;
	});

   // EventFactory.getEvents(user)
   // .then( function(eventList) {
   //    $scope.events = eventList;
   //    console.log('eventList', eventList);
   // });

});
