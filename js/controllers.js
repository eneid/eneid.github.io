'use strict';

myApp.factory('Message', ['$resource', function ($resource) {
    return $resource('http://localhost:8080/api/timeline');
}]);

myApp.controller('TimeLineController', function ($scope, $timeout, Message, $cookies, $http) {
    $scope.currentTimeline = 0;

    $scope.update = function () {
        $http.defaults.headers.common['Authorization'] = "Basic " + $cookies.token;
        $scope.messages = Message.query();
        $scope.currentTimeline = $scope.currentTimeline + 1;
        //$timeout($scope.update, 1000);
    };
    $scope.update();
});

myApp.controller('AuthController', function ($http, $scope, $cookies, $base64, $location) {
    $scope.auth = function (email, password) {
        $cookies.token = $base64.encode(email + " " + password);
        $http.defaults.headers.common['Authorization'] = "Basic " + $cookies.token;
        $location.path("/timeline");
    };
});
