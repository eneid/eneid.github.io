'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ngRoute', 'ui.gravatar', 'ngResource', 'base64', 'ngCookies']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/auth', {templateUrl: 'partials/auth.html', controller: 'AuthController'});
        $routeProvider.when('/timeline', {templateUrl: 'partials/timeline.html', controller: 'TimeLineController'});
        $routeProvider.when('/subscribe', {templateUrl: 'partials/subscribe.html', controller: 'SubscribeController'});
        $routeProvider.otherwise({redirectTo: '/auth'});
    }]);
