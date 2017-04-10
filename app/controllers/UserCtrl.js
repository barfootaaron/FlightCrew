"use strict";

//login, logout, register, loginGoogle, clever conditional, authfactory

app.controller("UserCtrl", function($scope, $window, AuthFactory, UserFactory, $location){

    //run these when controller loads
    $scope.account = {
        email: "",
        password: ""
    };

    let logout = () => {
        AuthFactory.logoutUser()
        .then(function(data){
            $window.location.url = "#!/login";
        }, function(error){
        });
    };
    //end of logout

    //when first loaded, make sure no one is logged in
    if(AuthFactory.isAuthenticated()){
        logout();
    }

    //setup functions to be available to the app for register, login email/password, and google
    $scope.register = () => {
        AuthFactory.createUser({
          email: $scope.account.email,
          password: $scope.account.password
        })
        .then( (userData) => {
          $scope.login();
        }, (error) => {
        });
    };

    $scope.login = () => {
        AuthFactory
        .loginUser($scope.account)
        .then( () => {
            $window.location.href = "#!/flights/list";
        });
    };

    $scope.loginGoogle = () => {
        AuthFactory.authWithProvider()
        .then(function(result) {
            var user = result.user.uid;
            var newName = result.user.displayName;
            $scope.newUser = {
              uid: user,
              name: newName
            };
            UserFactory.checkNewUser($scope.newUser)
            .then ((userCollection) => {
              let collectionLength = Object.keys(userCollection).length;
              if (collectionLength > 0) {
                $window.location.href = "#!/flights/list";
              } else {
                $scope.addNewUser($scope.newUser);
              }
            });

            //Once logged in, go to another view

        }).catch(function(error) {
            // Handle the Errors.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

        });
    };

    $scope.addNewUser = (newUser) => {
      UserFactory.postNewUser(newUser)
      .then ( () => {
        $window.location.href = "#!/flights/list";
      });
    };
});
