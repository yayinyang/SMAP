var map = new mapboxgl.Map({
    container: 'map',
    style: constructionLayer,
    zoom: 10,
    center: [ 120.1536, 30.26555 ],
    maxZoom: 17,
    minZoom: 5,
    pitch: 0
});

angular.module("construction",["navApp"]).controller("constructionController",["$scope","$location","$anchorScroll",function (
    $scope,$location,$anchorScroll) {
    $scope.provinceArr = province;
    $scope.nowProvince = '浙江';
    $scope.captureArr = ['A','B','C','F','G','H','J','L','N','Q','S','T','X','Y','Z'];

    $scope.showChoosedCity = function (arg){
        if(arg==='nowCity'){
            $scope.nowCity = {
                display:'none'
            };
            $scope.choosedCity = {
                display:'block'
            };
            $scope.cityList= {
                display:'block'
            }
        }else{
            $scope.nowCity = {
                display:'block'
            };
            $scope.choosedCity ={
                display:'none'
            };
            $scope.cityList= {
                display:'none'
            };
        }
    };
    $scope.locationProvince = function (data) {

        //此处注释掉是因为其他限制使用其他省份数据
        /* $scope.provincePid = data.id;
        $scope.nowProvince = data.name;
        map.flyTo({center:[ data.point.x, data.point.y]});*/
    };
    $scope.goCapture = function (data){
        var local = 'capture'+data;
        $location.hash(local);
        $anchorScroll();
    };
    map.on('click','construction_Layer',function (e) {
        console.log(e);
    })
}]);
