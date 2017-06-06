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
           $scope.isLogin = true;
           $scope.loginTitle = {
               innerText: $scope.isLogin ? '退出登录' : '登录'
           }
           $scope.turnToPage = function (param) {
            /*   if(App.Util.checkToken()){
                   if($scope.relativeHash === 'pages/' && param === '../index.html'){
                       param = 'index.html';
                   }else if($scope.relativeHash){
                       param = $scope.relativeHash + param;
                   }
                   window.location.href = param;
               }else{
                   App.Util.sout(window);
               }*/
               if($scope.relativeHash === 'pages/' && param === '../index.html'){
                   param = 'index.html';
               }else if($scope.relativeHash){
                   param = $scope.relativeHash + param;
               }
               window.location.href = param;
           };
       }
   }
});