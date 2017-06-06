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
           $scope.isLogin = App.Util.checkToken();
           $scope.loginTitle = $scope.isLogin ? '退出登录' : '登录';
           $scope.turnToPage = function (param) {
                var toDownloadPage = param.search(/productWarehouse/);
                if( toDownloadPage > -1){ // 跳转下载页面
                    if(App.Util.checkToken()){
                        if($scope.relativeHash){
                            param = $scope.relativeHash + param;
                        }
                    }else {
                        App.Util.sout(window);
                    }
                }else{
                    if($scope.relativeHash === 'pages/' && param === '../index.html'){
                        param = 'index.html';
                    }else if(param === 'login.html' && $scope.isLogin){//判断是登录还是退出登录
                        if($scope.relativeHash){
                            switch ($scope.relativeHash){
                                case 'pages/': param = 'index.html';break;
                                case '../':    param = $scope.relativeHash + '../index.html';break;
                            }
                        }else {
                            param = '../index.html';
                        }
                        App.Util.deleteToken();
                        $scope.isLogin = App.Util.checkToken();
                    }else if($scope.relativeHash){
                        param = $scope.relativeHash + param;
                    }
                }
               window.location.href = param;
           };
       }
   }
});