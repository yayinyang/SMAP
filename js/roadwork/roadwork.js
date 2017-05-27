var app = angular.module("Roadwork",[]);
app.controller("RoadController",['$scope',function($scope){
    $scope.pagename="pageOne";
    $scope.changePage=function(pagenames){
        $scope.pagename=pagenames;
    }
}])

