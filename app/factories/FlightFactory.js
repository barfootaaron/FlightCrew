"use strict";

app.factory("FlightFactory", ($q, $http, FBCreds, $sce, APICreds) => {
// console.log("FlightFactory checking in");

   let getFlights = (user) => {
      let userFlights = [];
      return $q((resolve, reject) => {
         $http.get(`${FBCreds.databaseURL}/flights.json?orderBy="uid"&equalTo="${user}"`)
         .then((userFlightObj) => {
            let userFlightList = userFlightObj.data;
            console.log('userFlightList', userFlightList);
            Object.keys(userFlightList).forEach((key) => {
               userFlightList[key].id = key;
               userFlights.push(userFlightList[key]);
                  // SORT BY DATE HERE...
            });
            resolve(userFlights);
         })
         .catch((error) => {
            reject(error);
         });
      });
   };

   let getNewFlightStats = (newFlight) => {
      return $q((resolve, reject) => {
         return $http.jsonp(`${APICreds.apiURL}/${newFlight.airline}/${newFlight.flightNumber}/arr/${newFlight.arrYear}/${newFlight.arrMonth}/${newFlight.arrDay}?appId=${APICreds.appKey}&appKey=${APICreds.apiKey}&utc=false`)
         .then((dataObj) => {
            let newFlightStatusArray = [];
            let newFlightData = dataObj.data;
            console.log('newFlightData', newFlightData);

            Object.keys(newFlightData).forEach((key) => {
               newFlightStatusArray = newFlightData.flightStatuses[0];

// Some DL flights weren't returning a value for estimated dep/arr so I am using scheduled arr/dep for now
// But ideally app will show estimatead depTime/arrTime and arrTerm for most accurate results
               // newFlight.arrTime = newFlightDataArray.operationalTimes.estimatedGateArrival.dateLocal;
               // newFlight.depTime = newFlightDataArray.operationalTimes.estimatedGateDeparture.dateLocal;
               // newFlight.arrDate = newFlightDataArray.operationalTimes.estimatedGateArrival.dateLocal;

               newFlight.arrTime = newFlightStatusArray.operationalTimes.scheduledGateArrival.dateLocal;
               newFlight.depTime = newFlightStatusArray.operationalTimes.scheduledGateDeparture.dateLocal;
               newFlight.arrDate = newFlightStatusArray.operationalTimes.scheduledGateArrival.dateLocal;

               newFlight.arrTerm = newFlightStatusArray.airportResources.arrivalTerminal;
               console.log("newFlight.arrTerm", newFlight.arrTerm);

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




// updateFlightInFirebase TAKES UPDATED API DATA AND POSTS IT TO FIREBASE
   let updateFlightInFirebase = (flightId, editedFlight) => {
   console.log("JSON.stringify", JSON.stringify(editedFlight));
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



   return {getFlights, postNewFlight, deleteFlight, getSingleFlight, updateFlightInFirebase, getEventFlights, getNewFlightStats};


   });
