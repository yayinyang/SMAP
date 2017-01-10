/**
 * Created by liwanchong on 2017/1/5.
 */
var directiveApp = angular.module('directiveApp', []);
directiveApp.directive('tab',function () {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: '../js/directives/tab/tab.html',
        scope: {
            displayModel:'=displayModel',
            displayTotal:'=displayTotal',
            displayPage: '=displayPage',
            displayId:'@displayId'
        },
        controller:function ($scope) {
//             $scope.page = 1;
//             $scope.total = $scope.displayModel.total;
//             console.log($scope.data);
//             $scope.flagId = '';
//             $scope.showStaticInfo = function (item) {
//                 $scope.flagId = item.product_id;
//             };
//             $scope.$watch('displayModel', function (newVal, oldVal) {
//                 console.log('old' + oldVal.total);
//                 console.log('new' + newVal.total)
//             });
        },
        link:function (scope, element, attrs) {
            scope.flagId = '';
            scope.showStaticInfo = function (item) {
                scope.flagId = item.product_id;
                scope.$emit('show_product_event', {productId: item.product_id });
            };
            scope.addProduct = function (type) {
                scope.$emit('add_product_event',{type: type})
            }
            // return function destroy() {
            //     console.log(scope.page);
            // }
        }
    }
})