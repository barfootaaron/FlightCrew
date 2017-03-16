"use strict";

app.controller("NavCtrl", function($scope, $window, SearchTermData) {
	$scope.searchText = SearchTermData;
	$scope.isLoggedIn = false;

//     $( document ).ready(function(){
//   $(".button-collapse").sideNav();
// });

	//addd a listener for login/logout to show/hide nav items
	firebase.auth().onAuthStateChanged( function(user) {
      if (user) {
         $scope.isLoggedIn = true;
         console.log("currentUser logged in", user, $scope.isLoggedIn);

     	} else{
         $scope.isLoggedIn = false;
         console.log("currentUser logged in", $scope.isLoggedIn);
         //$window.location forces the page to completely reload
         $window.location.href = "#!/login";
        }
    });     
});