'use strict';

myApp.factory('Message', ['$resource', function ($resource) {
    return $resource('/timeline/:currentTimelineId.json');
}]);

myApp.controller('TimeLineController', ['$scope', '$http', '$timeout', 'Message', function ($scope, $http, $timeout, Message) {
    $scope.currentTimeline = 0;

    $scope.update = function () {
        $scope.messages = Message.query({
            currentTimelineId: $scope.currentTimeline % 2
        });
        $scope.currentTimeline = $scope.currentTimeline + 1;
        $timeout($scope.update, 1000);
    };
    $scope.update();
}]);
