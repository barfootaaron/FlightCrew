
"use strict";
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Minimal Chat Controller
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
app.controller( "chat", [ 'Messages', '$scope', function( Messages, $scope, ChatFactory, AuthFactory, $location, $routeParams ) {
    // - - - - - - - - - - - - - - - - - -
    // Message Inbox
    // This array will hold the messages
    // ordered by receipt.
    // - - - - - - - - - - - - - - - - - -
    $scope.messages = [];
    $scope.user = AuthFactory.getUser();

    // - - - - - - - - - - - - - - - - - -
    // Receive Messages
    // Push to Message Inbox.
    // - - - - - - - - - - - - - - - - - -
    Messages.receive(function(message) {
        $scope.messages.push(message);
    });

    // - - - - - - - - - - - - - - - - - -
    // Send Message
    // This is a controller method used
    // when a user action occurs.
    // Also we expect a model reference
    // ng-model="textbox".
    // - - - - - - - - - - - - - - - - - -
    $scope.send = function() {
        Messages.send({ 
            data: $scope.textbox 
        });
    };

}]);