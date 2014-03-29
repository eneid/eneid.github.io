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

    $scope.disconnect = function () {
        $cookies.token = null;
        $location.path("/auth");
    };
});

myApp.controller('AuthController', function ($http, $scope, $cookies, $base64, $location) {
    $scope.auth = function (email, password) {
        $cookies.token = $base64.encode(email + ":" + password);
        $http.defaults.headers.common['Authorization'] = "Basic " + $cookies.token;
        $location.path("/timeline");
    };
});
