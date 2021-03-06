"use strict";

var app = angular.module("FlightCrewApp", ["ngRoute"]).config(function($sceProvider) {
  $sceProvider.enabled(false);
});

let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
    AuthFactory.isAuthenticated()
    .then ( (userExists) => {
        if (userExists){
            resolve();
        } else {
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
    when('/events/:eventId', {
      templateUrl: "partials/event-details.html",
      controller: "EventViewCtrl",
      resolve: {isAuth}
   }).
    when('/events/:eventId/edit', {
      templateUrl: "partials/event-form.html",
      controller: "EventEditCtrl",
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
    when('/chatroom', {
      templateUrl: "partials/chatroom.html",
      controller: "chat",
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