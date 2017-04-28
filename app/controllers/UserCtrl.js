"use strict";

app.controller("UserCtrl", function($scope, $window, AuthFactory, UserFactory, $location){

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

    if(AuthFactory.isAuthenticated()){
        logout();
    }

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


        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
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
