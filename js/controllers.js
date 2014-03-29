'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('TimeLineController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
        $scope.currentTimeline = 0;

        $scope.update = function() {
            $http.get('timeline' + $scope.currentTimeline % 2 + '.json').success(function (data) {
                $scope.messages = data;
                $scope.currentTimeline = $scope.currentTimeline + 1;
                $timeout($scope.update, 1000);
            });
        };
        $scope.update();
    }]);
