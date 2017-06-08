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
    $scope.src = '../img/trafficLimited/';
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
            kind: '限号',
            isLimit: false,
            imgSrc: $scope.src + 'number.png',
            limitImgSrc: $scope.src + 'numberLimited.png',
        }, {
            kind: '外阜车',
            isLimit: false,
            imgSrc: $scope.src + 'field.png',
            limitImgSrc: $scope.src + 'fieldLimited.png',
        }, {
            kind: '车型',
            isLimit: false,
            imgSrc: $scope.src + 'carKind.png',
            limitImgSrc: $scope.src + 'carKindLimited.png',
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
            ]

        }, {
            kind: '能源',
            isLimit: false,
            imgSrc: $scope.src + 'energy.png',
            limitImgSrc: $scope.src + 'energyLimited.png',
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
            ]
        }, {
            kind: '车牌',
            isLimit: false,
            imgSrc: $scope.src + 'card.png',
            limitImgSrc: $scope.src + 'cardLimited.png',
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
            ]
        }, {
            kind: '其他',
            isLimit: true,
            imgSrc: $scope.src + 'other.png',
            limitImgSrc: $scope.src + 'otherLimited.png',
        },
    ]
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
        $scope.limitKind[index].isLimit = !$scope.limitKind[index].isLimit;
        if( $scope.limitKind[index].children){
            if($scope.limitKind[index].isLimit){
                for(var i = 0; i < $scope.limitKind[index].children.length; i++){
                    $scope.limitKind[index].children[i].flag = true;
                }
            }else {
                for(var i = 0; i < $scope.limitKind[index].children.length; i++){
                    $scope.limitKind[index].children[i].flag = false;
                }
            }
        }
        $scope.contactParameter();
    };
    $scope.changeDetailKind = function (data) {
        for(var i = 0; i < $scope.limitKind.length; i++){
            if($scope.limitKind[i].children){
                for(var j = 0; j < $scope.limitKind[i].children.length; j++){
                    if($scope.limitKind[i].children[j].kind === data){
                        $scope.limitKind[i].children[j].flag = !$scope.limitKind[i].children[j].flag;
                    }
                }
                var childrenFlag = 0;
                for(var k = 0; k < $scope.limitKind[i].children.length; k++){
                   childrenFlag += Number($scope.limitKind[i].children[k].flag);
                }
                if(childrenFlag === 0){
                    $scope.limitKind[i].isLimit = false;
                }else{
                    $scope.limitKind[i].isLimit = true;
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
