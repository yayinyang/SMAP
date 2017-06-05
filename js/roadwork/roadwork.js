var app = angular.module("Roadwork",['navApp']);
app.controller("RoadController",['$scope',function($scope){
    $scope.pagename="pageOne";
    $scope.relativeHash = '../';
    $scope.changePage=function(pagenames){
        $scope.pagename=pagenames;
    }
}])

