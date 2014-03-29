'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ngRoute', 'ui.gravatar', 'ngResource']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/timeline', {templateUrl: 'partials/timeline.html', controller: 'TimeLineController'});
  $routeProvider.otherwise({redirectTo: '/timeline'});
}]);
