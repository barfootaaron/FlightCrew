"use strict";

app.factory("FlightFactory", ($q, $http, FBCreds, $sce, APICreds) => {

//////////////////////////////////////////////////////////////
// getFlights loads the user's list of flights from Firebase//
//////////////////////////////////////////////////////////////
   let getFlights = (user) => {
      let userFlights = [];
      return $q((resolve, reject) => {
         $http.get(`${FBCreds.databaseURL}/flights.json?orderBy="uid"&equalTo="${user}"`)
         .then((userFlightObj) => {
            let userFlightList = userFlightObj.data;
            Object.keys(userFlightList).forEach((key) => {
               userFlightList[key].id = key;               
               userFlights.push(userFlightList[key]);
            });
            resolve(userFlights);
         })
         .catch((error) => {
            reject(error);
         });
      });
   };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// updateFlight sends api call to check for any changes in flightStats, then applies any changes to the flight object properties //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   let updateFlightStats = (flightId) => {
      return $q((resolve, reject) => {
         return $http.jsonp(`${APICreds.apiURL}/${flightId.airlineCode}/${flightId.flightNumber}/arr/${flightId.arrYear}/${flightId.arrMonth}/${flightId.arrDay}?appId=${APICreds.appKey}&appKey=${APICreds.apiKey}&utc=false`)
         .then((dataObj) => {
            let FlightStatusArray = [];
            let AppendixArray = [];
            let flightData = dataObj.data;

            Object.keys(flightData).forEach((key) => {
               FlightStatusArray = flightData.flightStatuses[0];
               AppendixArray = flightData.appendix.airlines;

               flightId.airlineName = AppendixArray[0].name;
               flightId.arrTime = FlightStatusArray.operationalTimes.estimatedGateArrival.dateLocal;
               flightId.depTime = FlightStatusArray.operationalTimes.estimatedGateDeparture.dateLocal;
               flightId.arrDate = FlightStatusArray.operationalTimes.estimatedGateArrival.dateLocal;
               flightId.arrTerm = FlightStatusArray.airportResources.arrivalTerminal;
               flightId.arrAirport = FlightStatusArray.arrivalAirportFsCode;
               flightId.depAirport = FlightStatusArray.departureAirportFsCode;
               flightId.flightStatsId = FlightStatusArray.flightId;
            });
            resolve(FlightStatusArray);
         })
         .catch((error) => {
            reject(error);
         });
      });
   };


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// getNewFlightStats sends newFlight form data to api and returns then assigns desired data about flight to newFlight Object//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   let getNewFlightStats = (newFlight) => {
      return $q((resolve, reject) => {
         return $http.jsonp(`${APICreds.apiURL}/${newFlight.airlineCode}/${newFlight.flightNumber}/arr/${newFlight.arrYear}/${newFlight.arrMonth}/${newFlight.arrDay}?appId=${APICreds.appKey}&appKey=${APICreds.apiKey}&utc=false`)
         .then((dataObj) => {
            let NewFlightStatusArray = [];
            let NewAppendixArray = [];
            let newFlightData = dataObj.data;

            Object.keys(newFlightData).forEach((key) => {
               NewFlightStatusArray = newFlightData.flightStatuses[0];
               NewAppendixArray = newFlightData.appendix.airlines;

               newFlight.airlineName = NewAppendixArray[0].name;
               newFlight.arrTime = NewFlightStatusArray.operationalTimes.scheduledGateArrival.dateLocal;
               newFlight.depTime = NewFlightStatusArray.operationalTimes.scheduledGateDeparture.dateLocal;
               newFlight.arrDate = NewFlightStatusArray.operationalTimes.scheduledGateArrival.dateLocal;
               newFlight.arrTerm = NewFlightStatusArray.airportResources.arrivalTerminal;
               newFlight.arrAirport = NewFlightStatusArray.arrivalAirportFsCode;
               newFlight.depAirport = NewFlightStatusArray.departureAirportFsCode;
               newFlight.flightStatsId = NewFlightStatusArray.flightId;

            });
            resolve(NewFlightStatusArray);
         })
         .catch((error) => {
            reject(error);
         });
      });
   };

 /////////////////////////////////////////// ///////////////////////////////////////////////////////////////////////////////////
// postNewFlight sends data for new flight  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
         

   let postNewFlight = (newFlight) => {
      return $q((resolve, reject) => {
         $http.post(`${FBCreds.databaseURL}/flights.json`,
            JSON.stringify(newFlight))
         .then((ObjectFromFirebase) => {
            resolve(ObjectFromFirebase);
         })
         .catch((error) => {
            reject(error);
         });
      });
   };

// deleteFlight deletes flights AND also is used to 'check off' a flight once pickup is complete - aka remove it.
   let deleteFlight = (flightId) => {
      return $q((resolve, reject) => {
         $http.delete(`${FBCreds.databaseURL}/flights/${flightId}.json`)
         .then((ObjectFromFirebase) => {
            resolve(ObjectFromFirebase);
         })
         .catch((error) => {
            reject(error);
         });
      });
   };

// getSingleFlight goes and gets single flight for flight view.
   let getSingleFlight = (flightId) => {
      return $q(function(resolve, reject) {
         $http.get(`${FBCreds.databaseURL}/flights/${flightId}.json`)
         .then(function(flightObject){
            resolve(flightObject.data);
         })
         .catch(function(error){
            reject(error);
         });
      });
   };

// updateFlightInFirebase posts editedFlight to Firebase
   let updateFlightInFirebase = (flightId, editedFlight) => {
      return $q(function(resolve, reject) {
         //pass the item we're adjusting and then the actual item
         $http.patch(`${FBCreds.databaseURL}/flights/${flightId}.json`,
            angular.toJson(editedFlight))
         .then(function(ObjectFromFirebase) {
            resolve(ObjectFromFirebase);
         })
         .catch((error) => {
            reject(error);
         });
      });
   };

//Some day this will load a list of flights assigned to a particular event
   let getEventFlights = (eventId) => {
      let eventFlights = [];
      return $q((resolve, reject) => {
         $http.get(`${FBCreds.databaseURL}/flights.json?orderBy="eventId"&equalTo="${eventId}"`)
         .then((eventFlightObject) => {
            let eventFlightList = eventFlightObject.data;
            
            Object.keys(eventFlightList).forEach((key) => {
               eventFlightList[key].id = key;
               eventFlights.push(eventFlightList[key]);
            });
            resolve(eventFlights);
         })
         .catch((error) => {
            reject(error);
         });
      });
   };

return {getFlights, updateFlightStats, postNewFlight, deleteFlight, getSingleFlight, updateFlightInFirebase, getEventFlights, getNewFlightStats};
});
