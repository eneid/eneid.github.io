'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', '$http', function($scope, $http) {
    $http.get('timeline.json').success(function(data) {
      $scope.messages = data;
    });
  }])
  .controller('MyCtrl2', [function() {

  }]);
