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
               console.log(userFlights);
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
      return $http.jsonp(`https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/flight/status/UA/1187/arr/2017/3/16?appId=fd780cfd&appKey=38443d1ac63bdc829305a1163d4a1683&utc=false`);
         // return $http.get(`${APICreds.apiURL}/${newFlight.airline}/${newFlight.number}/arr/2017/3/16?appId=${APICreds.appKey}&appKey=${APICreds.apiKey}&utc=false`);
         };
   //          let newFlightDataList = newFlightObject.data;
   //          Object.keys(newFlightDataList).forEach((key) => {
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



   // EXAMPLE API CALL 
   // $http.get(`https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/{flight.airline}/{flight.number}/arr/{flight.year"}/{flight.month}/{flight.day}?appId=fd780cfd&appKey=c2087fbd566e5d53067a8480f4e68492&utc=false"`)


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
   // console.log("angularJSON", angular.toJson(editedFlight));
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
            console.log('Board Pin List: ', eventFlightList);
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
