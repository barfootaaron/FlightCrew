"use strict";

app.factory("FlightFactory", ($q, $http, FBCreds, $sce, APICreds) => {
console.log("FlightFactory checking in");

   let getFlights = (user) => {
      let userFlights = [];
      return $q((resolve, reject) => {
         console.log("user at getFlights", user);
         $http.get(`${FBCreds.databaseURL}/flights.json?orderBy="uid"&equalTo="${user}"`)
         .then((userFlightObject) => {
            let userFlightList = userFlightObject.data;
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

   let getNewFlightStats = (newFlight) => {
   //    return $q((resolve, reject) => {
      // return $http.jsonp(`https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/flight/status/UA/1187/arr/2017/3/16?appId=(classified)&appKey=(classified)&utc=false`);
         return $http.jsonp(`${APICreds.apiURL}/${newFlight.airline}/${newFlight.number}/arr/${newFlight.year}/${newFlight.month}/${newFlight.day}?appId=${APICreds.appKey}&appKey=${APICreds.apiKey}&utc=false`,
            JSON.stringify(newFlight));
         };
   //          let newFlightDataList = newFlightObject.data;
   //          Object.keys(newFlightDataList).forEach((key) => { // CAN WE USE NESTED forEach() HERE? OTHERWISE REG for
   //             newFlightDataList[key].id = key;
   //             newFlightData.push(newFlightData[key]);
   //             console.log(newFlightData);
   //          });
   //          resolve(newFlightData);
   //       })
   //       .catch((error) => {
   //          reject(error);
   //       });
   //    });

   

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

   let updateFlight = (flightId, editedFlight) => {
      //properties with leading $$ characters will be stripped since Angular uses that notaton internally
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



   return {getFlights, postNewFlight, deleteFlight, getSingleFlight, updateFlight, getEventFlights, getNewFlightStats};


   });
