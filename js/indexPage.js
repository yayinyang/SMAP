angular.module('indexpageApp',['navApp']).controller('indexpageCtrl',['$scope',function ($scope) {
    $scope.relativeHash = 'pages/';
    $scope.locFlag = 'indexpageFlag';
    $scope.minWidth = window.screen.width - 30;
    $scope.indexPageMinWidth = {
        minWidth: $scope.minWidth,
        overflow: 'auto',
    }
}]);