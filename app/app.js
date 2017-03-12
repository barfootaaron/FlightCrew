"use strict";

var app = angular.module("FlightCrewApp", ["ngRoute"]);



let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  // console.log("running isAuth");
    AuthFactory.isAuthenticated()
    .then ( (userExists) => {
    console.log("userExists", userExists);
        if (userExists){
      console.log("You is Authenticated, you good.");
            resolve();
        } else {
      console.log("Authentication rejected, get tf out.");
            reject();
        }
    });
});

app.config( function($routeProvider) {
   $routeProvider.
    when('/', {
      templateUrl: 'partials/login.html',
      controller: "UserCtrl"
   }).
    when('/login', {
      templateUrl: 'partials/login.html',
      controller: "UserCtrl"
   }).
    when('/logout', {
      templateUrl: 'partials/login.html',
      controller: "UserCtrl"
   }).
    when('/events/list', {
      templateUrl: 'partials/event-list.html',
      controller: "EventListCtrl",
      resolve: {isAuth}
   }).
    when('/events/new', {
      templateUrl: 'partials/event-form.html',
      controller: "EventNewCtrl",
      resolve: {isAuth}
   }).
    when('/flights/list', {
      templateUrl: 'partials/flight-list.html',
      controller: "FlightListCtrl",
      resolve: {isAuth}
    }).  
    when('/flights/new', {
      templateUrl: 'partials/flight-form.html',
      controller: "FlightNewCtrl",
      resolve: {isAuth}
   }).
    when('/flights/:flightId', {
      templateUrl: "partials/flight-details.html",
      controller: "FlightViewCtrl",
      resolve: {isAuth}
   }).
    when('/flights/:flightId/edit', {
      templateUrl: "partials/flight-form.html",
      controller: "FlightEditCtrl",
      resolve: {isAuth}
   }).
   otherwise('/');
});

//run when the app loads
app.run(($location, FBCreds) => {
   let creds = FBCreds;
   let authConfig = {
      apiKey: creds.apiKey,
      authDomain: creds.authDomain,
      databaseURL: creds.databaseURL
   };

   

   firebase.initializeApp(authConfig);
});