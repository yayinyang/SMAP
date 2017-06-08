var map = new mapboxgl.Map({
    container: 'map',
    style: trafficLimitedLayer,
    zoom: 10,
    center: [ 116.38402, 39.96261 ],
    maxZoom: 17,
    minZoom: 5,
    repaint: true,
    pitch: 0
});
angular.module("trafficLimited",["navApp"]).controller("trafficLimitedController",["$scope","$location","$timeout","$anchorScroll",function (
    $scope,$location,$timeout,$anchorScroll) {
    $scope.provinceArr = province;
    $scope.nowProvince = '北京';
    $scope.indexUrl = 'abc';
    $scope.captureArr = ['A','B','C','F','G','H','J','L','N','Q','S','T','X','Y','Z'];
    $scope.searchParameter = {};
    $scope.lineLayer = {
        "id": 'line_Limited_Layer',
        "type": 'line',
        "source" : "platelimit",
        'source-layer': 'platelimit_line',
        "minzoom": 5,
        "maxzoom": 17.1,
        "layout": {
            "line-join": "round",
            "visibility": "visible",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#FF0000",
            "line-width": {
                "stops": [[6, 1.5], [20, 10]],
                "base": 1.2
            },

        },

    };
    $scope.polygonLayer = {
        "id": 'polygon_Limited_Layer',
        "type": 'fill',
        "source" : "platelimit",
        'source-layer': 'platelimit_polygon',
        "minzoom": 5,
        "maxzoom": 17.1,
        'layout': {},
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.6
        }

    };

    $scope.limitKind = [
        {
            label: 'number',
            kind: 'No.',
            isLimit: false,
        }, {
            label: 'field',
            kind: '外地车辆',
            isLimit: false,
        }, {
            label: 'carKind',
            kind: '车型',
            isLimit: false,
            children:[
                {
                    kind: '客车',
                    label: 'bus',
                    flag: false,
                },
                {
                    kind: '卡车',
                    label: 'truck',
                    flag: false,
                },
            ],
            childrenIsOpen:false,

        }, {
            label: 'energy',
            kind: '能源',
            isLimit: false,
            children:[
                {
                    kind: '燃油',
                    label: 'gasoline',
                    flag: false,
                },
                {
                    kind: '纯电',
                    label: 'electric',
                    flag: false,
                },
                {
                    kind: '油电',
                    label: 'both',
                    flag: false,
                },
            ],
            childrenIsOpen:false,
        }, {
            label: 'card',
            kind: '车牌',
            isLimit: false,
            children:[
                {
                    kind: '蓝牌',
                    label: 'blue',
                    flag: false,
                },
                {
                    kind: '黄牌',
                    label: 'yellow',
                    flag: false,
                },
                {
                    kind: '黑牌',
                    label: 'black',
                    flag: false,
                },
                {
                    kind: '白牌',
                    label: 'white',
                    flag: false,
                },
                {
                    kind: '绿牌',
                    label: 'green',
                    flag: false,
                },
            ],
            childrenIsOpen:false,
        }, {
            label: 'other',
            kind: '其他',
            isLimit: true,
        },
    ];
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
    $scope.changeCondition = function (index) {
        if( $scope.limitKind[index].children){ // 有子元素时 函数功能为展开折叠子元素
            $scope.limitKind[index].childrenIsOpen = !$scope.limitKind[index].childrenIsOpen;
        }else{ // 无子元素时 函数功能为选择筛选条件
            $scope.limitKind[index].isLimit = !$scope.limitKind[index].isLimit;
            $scope.contactParameter();
        }
    };
    $scope.changeDetailKind = function (data) {
        for(var i = 0; i < $scope.limitKind.length; i++){
            if($scope.limitKind[i].children){
                for(var j = 0; j < $scope.limitKind[i].children.length; j++){
                    if($scope.limitKind[i].children[j].kind === data){
                        $scope.limitKind[i].children[j].flag = !$scope.limitKind[i].children[j].flag;
                    }
                }
            }
        }

        $scope.contactParameter();
    };
    $scope.getSearchParameter = function () {
        var parameter = {
            type: [],
            parm: [],
        };
        var tmp1;
        var tmp2;
        var tmp;
        for(var i = 0;  i < $scope.limitKind.length; i++){
            if($scope.limitKind[i].isLimit){
                parameter.type.push(i+1);
                if(!$scope.limitKind[i].children){
                    parameter.parm.push(0);
                }
            }
            if($scope.limitKind[i].children){
                for(var j = 0; j < $scope.limitKind[i].children.length; j++){
                    if($scope.limitKind[i].children[j].flag){
                       tmp1 = i+1;
                       tmp2 = j+1;
                       tmp = tmp1 + '-' + tmp2;
                        parameter.parm.push(tmp);
                    }
                }
            }
        }
        return parameter;

    };
    $scope.contactParameter = function () {
        var tmpParam = $scope.getSearchParameter();
        if(tmpParam.type.length === 0){
            App.Config.platelimit ='type=0&parm=0';
        }else{
            App.Config.platelimit = 'type=' +tmpParam.type + '&parm=' + tmpParam.parm;
        }
        map.style.sourceCaches.platelimit._source.tiles[0] = 'http://fs.navinfo.com/smapapi/platelimit/tile/' +
            '{z}/{x}/{y}?' + App.Config.platelimit;
        map.removeLayer('line_Limited_Layer');
        map.removeLayer('polygon_Limited_Layer');
        $timeout(function () {
            map.addLayer($scope.lineLayer);
            map.addLayer($scope.polygonLayer);
        },0);

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
}]);
