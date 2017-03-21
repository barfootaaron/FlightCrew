"use strict";

app.factory("FlightFactory", ($q, $http, FBCreds, $sce, APICreds) => {
// console.log("FlightFactory checking in");


//////////////////////////////////////////////////////////////
// getFlights loads the user's list of flights from Firebase//
//////////////////////////////////////////////////////////////
   let getFlights = (user) => {
      let userFlights = [];
      return $q((resolve, reject) => {
         $http.get(`${FBCreds.databaseURL}/flights.json?orderBy="uid"&equalTo="${user}"`)
         .then((userFlightObj) => {
            let userFlightList = userFlightObj.data;
            console.log('userFlightList', userFlightList);
            Object.keys(userFlightList).forEach((key) => {
               userFlightList[key].id = key;
               // console.log('key', key);
               userFlights.push(userFlightList[key]);
            });
            resolve(userFlights);
         })
         .catch((error) => {
            reject(error);
         });
      });
   };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// updateFlight sends api call to check for any changes in flightStats, then applies any changes to the flightData//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   let updateFlight = (flightId) => {
      return $q((resolve, reject) => {
         return $http.jsonp(`${APICreds.apiURL}/${flightId.airlineCode}/${flightId.flightNumber}/arr/${flightId.arrYear}/${flightId.arrMonth}/${flightId.arrDay}?appId=${APICreds.appKey}&appKey=${APICreds.apiKey}&utc=false`)
         .then((dataObj) => {
            let FlightStatusArray = [];
            let AppendixArray = [];
            
            let FlightData = dataObj.data;
            console.log('dataObj.data', dataObj.data);
            console.log('FlightData', FlightData);

            Object.keys(FlightData).forEach((key) => {
               FlightStatusArray = FlightData.flightStatuses[0];
               AppendixArray = FlightData.appendix.airlines;
               // console.log('newAppendixArray', newAppendixArray);

         // Some DL flights weren't returning a value for estimated dep/arr so I am using scheduled arr/dep for now//
         // But ideally app will show estimatead depTime/arrTime and arrTerm for most accurate results//
               flightId.arrTime = FlightStatusArray.operationalTimes.estimatedGateArrival.dateLocal;
               flightId.depTime = FlightStatusArray.operationalTimes.estimatedGateDeparture.dateLocal;
               flightId.arrDate = FlightStatusArray.operationalTimes.estimatedGateArrival.dateLocal;

               flightId.airlineName = AppendixArray[0].name;

               // flightId.arrTime = FlightStatusArray.operationalTimes.scheduledGateArrival.dateLocal;
               // flightId.depTime = FlightStatusArray.operationalTimes.scheduledGateDeparture.dateLocal;
               // flightId.arrDate = FlightStatusArray.operationalTimes.scheduledGateArrival.dateLocal;

               flightId.arrTerm = FlightStatusArray.airportResources.arrivalTerminal;
               // console.log("newFlight.arrTerm", newFlight.arrTerm);

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


//////////////////////////////////////////////////////////////////////////////////////////////////////////
// getNewFlightStats sends newFlight form data to api and returns then assigns desired data about flight//
//////////////////////////////////////////////////////////////////////////////////////////////////////////
   let getNewFlightStats = (newFlight) => {
      return $q((resolve, reject) => {
         return $http.jsonp(`${APICreds.apiURL}/${newFlight.airlineCode}/${newFlight.flightNumber}/arr/${newFlight.arrYear}/${newFlight.arrMonth}/${newFlight.arrDay}?appId=${APICreds.appKey}&appKey=${APICreds.apiKey}&utc=false`)
         .then((dataObj) => {
            let newFlightStatusArray = [];
            let newAppendixArray = [];
            
            let newFlightData = dataObj.data;
            console.log('newFlightData', newFlightData);

            Object.keys(newFlightData).forEach((key) => {
               newFlightStatusArray = newFlightData.flightStatuses[0];
               newAppendixArray = newFlightData.appendix.airlines;
               // console.log('newAppendixArray', newAppendixArray);

         // Some DL flights weren't returning a value for estimated dep/arr so I am using scheduled arr/dep for now//
         // But ideally app will show estimatead depTime/arrTime and arrTerm for most accurate results//
               // newFlight.arrTime = newFlightDataArray.operationalTimes.estimatedGateArrival.dateLocal;
               // newFlight.depTime = newFlightDataArray.operationalTimes.estimatedGateDeparture.dateLocal;
               // newFlight.arrDate = newFlightDataArray.operationalTimes.estimatedGateArrival.dateLocal;

               newFlight.airlineName = newAppendixArray[0].name;

               newFlight.arrTime = newFlightStatusArray.operationalTimes.scheduledGateArrival.dateLocal;
               newFlight.depTime = newFlightStatusArray.operationalTimes.scheduledGateDeparture.dateLocal;
               newFlight.arrDate = newFlightStatusArray.operationalTimes.scheduledGateArrival.dateLocal;

               newFlight.arrTerm = newFlightStatusArray.airportResources.arrivalTerminal;
               // console.log("newFlight.arrTerm", newFlight.arrTerm);

               newFlight.arrAirport = newFlightStatusArray.arrivalAirportFsCode;
               newFlight.depAirport = newFlightStatusArray.departureAirportFsCode;
               newFlight.flightStatsId = newFlightStatusArray.flightId;

            });

            resolve(newFlightStatusArray);

         })
         .catch((error) => {
            reject(error);
         });
      });
   };
         

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
      console.log("delete in factory", flightId);
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
   // console.log("JSON.stringify", JSON.stringify(editedFlight));
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
         console.log("event at getFlights", eventId);
         $http.get(`${FBCreds.databaseURL}/flights.json?orderBy="eventId"&equalTo="${eventId}"`)
         .then((eventFlightObject) => {
            let eventFlightList = eventFlightObject.data;
            console.log('Event Flight List: ', eventFlightList);
            
            Object.keys(eventFlightList).forEach((key) => {
               eventFlightList[key].id = key;
               eventFlights.push(eventFlightList[key]);
               console.log(eventFlights);
            });
            resolve(eventFlights);
         })
         .catch((error) => {
            reject(error);
         });
      });
   };



   return {getFlights, updateFlight, postNewFlight, deleteFlight, getSingleFlight, updateFlightInFirebase, getEventFlights, getNewFlightStats};


   });
