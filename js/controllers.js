'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('TimeLineController', ['$scope', '$http', function($scope, $http) {
    $http.get('timeline.json').success(function(data) {
      $scope.messages = data;
    });
  }]);
