'use strict';

var apiBaseUrl = 'http://eneid-api.herokuapp.com/api/';

var generateToken = function (base64, email, password) {
    console.log("Generated token for user: " + email);
    return base64.encode(email + ":" + password);
};

var logIn = function(cookies, base64, email, password, http) {
    console.log("Trying to log in user: " + email);
    cookies.token = generateToken(base64, email, password);
    http.defaults.headers.common['Authorization'] = "Basic " + cookies.token;
};

myApp.factory('Message', ['$resource', function ($resource) {
    return $resource(apiBaseUrl + 'timeline');
}]);

myApp.factory('User', ['$resource', function ($resource) {
    return $resource(apiBaseUrl + 'users');
}]);

myApp.controller('TimeLineController', function ($scope, $timeout, Message, $cookies, $route, $http) {
    $http.defaults.headers.common['Authorization'] = "Basic " + $cookies.token;

    $scope.update = function (justRefresh) {
        Message.query({}, function(data) {
            $scope.messages = data;
        });

        if (!justRefresh) {
            var timer = $timeout($scope.update, 10000);
            $scope.$on("$locationChangeStart", function( event ) {
                $timeout.cancel(timer);
            });
        }
    };

    if (!!$cookies.token) {
        $scope.update(false);
    }

    $scope.msgCollaps = function() {
        $scope.messageStatus = "msgCollaps";
    };

    $scope.sendMessage = function () {
        new Message({contents: $scope.content}).$save(function() {
            $scope.update(true);
        });
        $scope.content = '';
        $scope.messageStatus = "";
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
        $http.get(apiBaseUrl + "login", {
            params: { login: email, password: password }
        }).success(function () {
            logIn($cookies, $base64, email, password, $http);
            $location.path("/timeline");
        }).error(function (content, error_code) {
            console.log("error " + error_code + " during login: " + content);
        });
    };

    $scope.subscribe = function () {
        $location.path("/subscribe");
    }
});
myApp.controller('SubscribeController', function ($http, $scope, User, $cookies, $base64, $location) {
    $scope.subscribe = function (email, password, name, firstName) {
        new User({ "email": email, "password": password, "name": name, "firstName": firstName })
            .$save(function () {
                logIn($cookies, $base64, email, password, $http);
                $location.path("/timeline");
            }, function () {
                console.log(arguments);
            })
        ;
    };
});
