"use strict";

app.factory("FlightFactory", ($q, $http, FBCreds) => {
console.log("hello from FlightFactory");

   // let getAllFlights = () => {
   //    let allFlights = [];
   //    return $q((resolve, reject) => {
   //       $http.get(`${FBCreds.databaseURL}/flights.json`)
   //       .then((flightObject) => {
   //          let flightList = flightObject.data;
   //          Object.keys(flightList).forEach((key) => {
   //             flightList[key].id = key;
   //             allFlights.push(flightList[key]);
   //          });
   //          resolve(allFlights);
   //       })
   //       .catch((error) => {
   //          reject(error);
   //       });
   //    });

   // };

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
         //success and error are used in previous versions of angular. now then and catch
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

   let updateFlight = (flightId, editedFlight) => {
      //properties with leading $$ characters will be stripped since Angular uses that notaton internally
   console.log("angularJSON", angular.toJson(editedFlight));
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

   // let getBoardPins = (boardId) => {
   //    let boardPins = [];
   //    return $q((resolve, reject) => {
   //       console.log("board at getPins", boardId);
   //       $http.get(`${FBCreds.databaseURL}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
   //       .then((boardPinObject) => {
   //          let boardPinList = boardPinObject.data;
   //          console.log('Board Pin List: ', boardPinList);
   //          Object.keys(boardPinList).forEach((key) => {
   //             boardPinList[key].id = key;
   //             boardPins.push(boardPinList[key]);
   //             console.log(boardPins);
   //          });
   //          resolve(boardPins);
   //       })
         //success and error are used in previous versions of angular. now then and catch
   //       .catch((error) => {
   //          reject(error);
   //       });
   //    });
   // };

   //return so that they can become part of ItemStorage


   return {getFlights, postNewFlight, deleteFlight, getSingleFlight, updateFlight}; //getBoardPins};


   });
