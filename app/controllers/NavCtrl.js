"use strict";

app.controller("NavCtrl", function($scope, $window, SearchTermData, $routeParams, $location) {
	$scope.searchText = SearchTermData;
	$scope.isLoggedIn = false;

	//add a listener for login/logout to show/hide nav items
	firebase.auth().onAuthStateChanged( function(user) {
      if (user) {
         $scope.isLoggedIn = true;

     	} else {
         $scope.isLoggedIn = false;
         $window.location.href = "#!/login";
        }
    });     
});