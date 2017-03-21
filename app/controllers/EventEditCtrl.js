"use strict";

app.controller("EventEditCtrl", function($scope, $location, $routeParams, EventFactory, AuthFactory) {

  let user = AuthFactory.getUser();

  $scope.title = "Edit Event";
  $scope.btnText = "Update";
  $scope.newEvent = {};

  EventFactory.getSingleEvent($routeParams.eventId)
  .then( function successCallback(response){
     console.log("getSingleEventresponse", response);
      $scope.newEvent = response;
  });
    
  $scope.addNewEvent = function(){
    EventFactory.updateEvent($routeParams.eventId, $scope.newEvent)
    .then( function successCallback(response) {
      // console.log(response);
      $location.url("/events/list");
      
      Materialize.toast("Event edited successfully", 4000); 

    });
  };
});