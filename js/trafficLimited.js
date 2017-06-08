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
    $scope.imgSrc = [
        {
            kind: 'number',
            src: $scope.src + 'number.png',
        },
        {
            kind: 'field',
            src: $scope.src + 'field.png',
        },
        {
            kind: 'carKind',
            src: $scope.src + 'carKind.png',
        },
        {
            kind: 'energy',
            src: $scope.src + 'energy.png',
        },
        {
            kind: 'card',
            src: $scope.src + 'card.png',
        },
        {
            kind: 'other',
            src: $scope.src + 'other.png',
        },

    ];
    $scope.limitImgSrc = [
        {
            kind: 'numberLimited',
            src: $scope.src + 'numberLimited.png',
        },
        {
            kind: 'fieldLimited',
            src: $scope.src + 'fieldLimited.png',
        },
        {
            kind: 'carKindLimited',
            src: $scope.src + 'carKindLimited.png',
        },
        {
            kind: 'energyLimited',
            src: $scope.src + 'energyLimited.png',
        },
        {
            kind: 'cardLimited',
            src: $scope.src + 'cardLimited.png',
        },
        {
            kind: 'otherLimited',
            src: $scope.src + 'otherLimited.png',
        },
    ];
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
            kind: 'number',
            isLimit: false,
            imgSrc: $scope.imgSrc[0].src ,
            limitImgSrc: $scope.limitImgSrc[0].src ,
        }, {
            kind: 'field',
            isLimit: false,
            imgSrc:$scope.imgSrc[1].src,
            limitImgSrc: $scope.limitImgSrc[1].src,
        }, {
            kind: 'carKind',
            isLimit: false,
            imgSrc: $scope.imgSrc[2].src,
            limitImgSrc:  $scope.limitImgSrc[2].src,
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
            kind: 'energy',
            isLimit: false,
            imgSrc: $scope.imgSrc[3].src,
            limitImgSrc:  $scope.limitImgSrc[3].src,
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
            kind: 'card',
            isLimit: false,
            imgSrc: $scope.imgSrc[4].src,
            limitImgSrc: $scope.limitImgSrc[4].src,
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
            kind: 'other',
            isLimit: true,
            imgSrc: $scope.imgSrc[5].src,
            limitImgSrc:  $scope.limitImgSrc[5].src,
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
        if($scope.limitKind[index].isLimit){
            $scope.limitKind[index].imgSrc = $scope.imgSrc[index].src;
        }
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
                        var childrenFlag = 0;
                        for(var k = 0; k < $scope.limitKind[i].children.length; k++){
                            childrenFlag += Number($scope.limitKind[i].children[k].flag);
                        }
                        if(childrenFlag === 0){
                            $scope.limitKind[i].imgSrc = $scope.limitImgSrc[i].src;
                        }else{
                            $scope.limitKind[i].imgSrc = $scope.imgSrc[i].src;
                        }
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
