'use strict';

myApp.factory('Message', ['$resource', function ($resource) {
    return $resource('http://localhost:8080/api/timeline');
}]);

myApp.controller('TimeLineController', function ($scope, $timeout, Message, $cookies, $location) {
    $scope.currentTimeline = 0;

    $scope.update = function () {
        $scope.messages = Message.query();
        $scope.currentTimeline = $scope.currentTimeline + 1;
        $timeout($scope.update, 10000);
    };

    $scope.update();

    $scope.sendMessage = function() {
        new Message({contents: $scope.content}).$save();
        $location.path("/timeline");
    }
});

myApp.controller('LoggedController', function($scope, $cookies, $location) {
    $scope.disconnect = function () {
        $cookies.token = null;
        $location.path("/auth");
    };

    $scope.isLogged = function() {
        return $cookies.token !== "null";
    };

    $scope.cssClasspath = function() {
        return $location.path().substring(1);
    }
});

myApp.controller('AuthController', function ($http, $scope, $cookies, $base64, $location) {
    $scope.auth = function (email, password) {
        $cookies.token = $base64.encode(email + ":" + password);
        $http.defaults.headers.common['Authorization'] = "Basic " + $cookies.token;
        $location.path("/timeline");
    };

    $scope.subscribe = function(){
        $location.path("/subscribe");
    }
});

myApp.controller('SubscribeController', function ($http, $scope, $cookies, $base64, $location) {
    $scope.subscribe = function(firstname, lastname, gender){
        console.log("TODO ", firstname, lastname, gender);
    };
});
