'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.controllers',
  'ui.gravatar'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/timeline', {templateUrl: 'partials/timeline.html', controller: 'TimeLineController'});
  $routeProvider.otherwise({redirectTo: '/timeline'});
}]);
