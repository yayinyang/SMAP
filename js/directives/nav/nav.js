var script = document.getElementsByTagName("script");
var currentScriptPath = script[script.length-1].src;
var navApp = angular.module('navApp',[]);
navApp.directive('navBar',function () {
   return {
       restrict: 'EA',
       templateUrl: currentScriptPath.replace('nav.js','nav.html'),
       scope:{
           relativeHash: '=',
       },
       controller:function ($scope) {
           /*$scope.indexUrl = 'index.html';
           $scope.onlineUseUrl = 'pages/onlineUse.html';
           $scope.productDescriptionUrl = 'pages/productDescription.html';
           $scope.productServiceUrl = 'pages/productService.html';
           $scope.productWarehouseUrl = 'pages/productWarehouse.html';
           $scope.undevelopPageUrl = 'pages/undevelopPage.html';
           $scope.IDBUrl = 'pages/productWarehouse.html?specid=11&&specName=IDB';
           $scope.NIMIF_GUrl = 'pages/productWarehouse.html?specid=12&&specName=NIMIF-G';
           $scope.NAVEXUrl = 'pages/productWarehouse.html?specid=13&&specName=NAVEX';
           $scope.AIFUrl = 'pages/productWarehouse.html?specid=14&&specName=AIF';
           $scope.NIGDF_GUrl = 'pages/productWarehouse.html?specid=15&&specName=NIGDF-G';
           $scope.NIMIF_KUrl = 'pages/productWarehouse.html?specid=16&&specName=NIMIF-K';
           $scope.$on('linkTo',function (data) {
               if(data !== 'indexPage'){
                   $scope.indexUrl = '../index.html';
                   $scope.onlineUseUrl = 'onlineUse.html';
                   $scope.productDescriptionUrl = 'productDescription.html';
                   $scope.productServiceUrl = 'productService.html';
                   $scope.productWarehouseUrl = 'productWarehouse.html';
                   $scope.undevelopPageUrl = 'undevelopPage.html';
                   $scope.IDBUrl = 'productWarehouse.html?specid=11&&specName=IDB';
                   $scope.NIMIF_GUrl = 'productWarehouse.html?specid=12&&specName=NIMIF-G';
                   $scope.NAVEXUrl = 'productWarehouse.html?specid=13&&specName=NAVEX';
                   $scope.AIFUrl = 'productWarehouse.html?specid=14&&specName=AIF';
                   $scope.NIGDF_GUrl = 'productWarehouse.html?specid=15&&specName=NIGDF-G';
                   $scope.NIMIF_KUrl = 'productWarehouse.html?specid=16&&specName=NIMIF-K';
               }
           });*/
           $scope.turnToPage = function (param) {
               if($scope.relativeHash === 'pages/' && param === '../index.html'){
                   param = 'index.html';
               }else if($scope.relativeHash){
                   param = $scope.relativeHash + param;
               }
               window.location.href = param;
           }
           console.log($scope.relativeHash);
       }
   }
});