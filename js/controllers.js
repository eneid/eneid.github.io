'use strict';

var target = 'http://eneid-api.herokuapp.com/api/';

myApp.factory('Message', ['$resource', function ($resource) {
    return $resource(target + 'timeline');
}]);
myApp.factory('User', ['$resource', function ($resource) {
    return $resource(target + 'users');
}]);

myApp.controller('TimeLineController', function ($scope, $timeout, Message, $cookies, $route) {
    $scope.currentTimeline = 0;

    $scope.update = function () {
        $scope.messages = Message.query();
        $scope.currentTimeline = $scope.currentTimeline + 1;
        $timeout($scope.update, 10000);
    };

    if (!!$cookies.token) {
        $scope.update();
    }

    $scope.sendMessage = function () {
        new Message({contents: $scope.content}).$save();
        $scope.content = '';
        $route.reload();
    }
});

myApp.controller('LoggedController', function ($scope, $cookies, $location, $http) {
    $scope.disconnect = function () {
        delete $cookies.token;
        delete $http.defaults.headers.common['Authorization'];
        $location.path("/auth");
    };

    $scope.isLogged = function () {
        return !!$cookies.token;
    };

    $scope.cssClasspath = function () {
        return $location.path().substring(1);
    }
});

myApp.controller('AuthController', function ($http, $scope, $cookies, $base64, $location) {
    $scope.auth = function (email, password) {
        var token = $base64.encode(email + ":" + password);
        $http.get(target + "timeline", {headers: {"Authorization": "Basic " + token}}).success(function () {
            $cookies.token = token;
            $http.defaults.headers.common['Authorization'] = "Basic " + $cookies.token;
            $location.path("/timeline");
        }).error(function (content, error_code) {
            console.log("error " + error_code + " during logging");
        });
    };

    $scope.subscribe = function () {
        $location.path("/subscribe");
    }
});

myApp.controller('SubscribeController', function ($http, $scope, User, $cookies, $base64, $location) {
    $scope.subscribe = function (email, password, name, firstName) {
        console.log(email, password, name, firstName);
        var user = new User({ "email": email, "password": password, "name": name, "firstName": firstName });
        user.$save();
        console.log(user);
        $cookies.token = $base64.encode(email + ":" + password);
        $http.defaults.headers.common['Authorization'] = "Basic " + $cookies.token;
        $location.path("/timeline");
    };
});
