angular.module('indexpageApp',['navApp']).controller('indexpageCtrl',function ($scope) {
    $scope.turnToPage = function (param) {
        if(param !=='index.html'){
            window.location.href = 'pages/' + param;
        }
    }
});