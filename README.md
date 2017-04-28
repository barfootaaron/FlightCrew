# FlightCrew

Flight Crew is an AngularJS app created to give users the ability to track a set of flights for a group of people coming into a town for an event and then assign each flight pickup to a specific staff member. 

FlightCrew is intended to be  maintained by a company such as a tour-operator or event-manager who needs a way to schedule charter bus pickups for a very large amount of people arriving on many diiferent airlines, also into multiple airports. 

FlightCrew tracks all flights for a trip and notifies the staff assigned to the flight for any changes in status. FlightCrew also provides users a real time view of the location, status, and estimated arrival time of the flights.

## Installing
```
git clone https://github.com/barfootaaron/FlightCrew.git
```

# DEV AND API DEPENDENCIES

## DATABASE STORAGE
This version of FlightCrew uses a Firebase Database to store all flight data and updated data when the app receives new data from the FlightStats API. To run this app, you will need to create a Firebase database and enter the API Key, Auth Domain, and Database URL values into the code below, then add this code to a new file at the location app/values/fb-creds.js.

```
"use strict";

app.constant("FBCreds", {
    apiKey: "",
    authDomain: "",
    databaseURL: ""
});
```


## API
Flight Crew uses the FlightStats REST API to acquire original and updated flight data that is requested by the user. A FlightStats API Key and APP Key are needed to run the application. 

* To sign up for an evaluation account for FlightStats, visit the link below. https://developer.flightstats.com
* Once your FlightStats account is active, add your API Key and App Key to the code below and then add this code to a new file at the location app/values/api-creds.js

```
"use strict";

app.constant("APICreds", {
    apiKey: "",
    appKey: "",
    apiURL: "https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/flight/status"
});
```

## NPM Packages needed to run FlightCrew locally
To install the necessary node packages for FlightCrew, make sure you have NPM installed on your machine. Then, in your terminal, go to the 'lib' directory, then run the command 'npm install'. This will install all of the node packages required to run FlightCrew locally.



 
