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

angular.module("trafficLimited",["dataService","navApp"])
    .controller("trafficLimitedController",["$scope","$location","dsEdit","$timeout","$http","$anchorScroll",function (
    $scope,$location,dsEdit,$timeout,$http,$anchorScroll) {
    $scope.locFlag = 'onlineUseFlag';
    $scope.provinceArr = province;
    $scope.nowProvince = '北京市';
    $scope.searchWord = '';
    $scope.captureArr = ['A','B','C','F','G','H','J','L','N','Q','S','T','X','Y','Z'];
    $scope.searchParameter = {};
    $scope.colorArr = ['rgba(255,114,86,0.8)', 'rgba(255,11486,0.3)', 'rgba(20,120,255,0.3)'];
    $scope.initArea = '';
    $scope.initPrinciple = '';
    $scope.initCar = '';
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
        'layout': {
            /*'background-color': '#00FF00'*/
        },
        'paint': {
            'fill-color': '#FF0000',
            'fill-opacity': 0.2,
           /* 'fill-outline-color': '#ffff00',
            'fill-antialias': true,*/
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
              /*  {
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
                },*/
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
            $('.limitToday').hide();
            $scope.limitDayList = {
                display:'none'
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
            $('.limitToday').show();
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
                //判断是否有子元素被选中
                var childrenIsSelectFlag = 0;
                for(var k = 0; k < $scope.limitKind[i].children.length; k++){
                    if($scope.limitKind[i].children[k].flag){
                        childrenIsSelectFlag = Number($scope.limitKind[i].children[k].flag);
                    }
                }
                if(childrenIsSelectFlag === 0){
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
        map.style.sourceCaches.platelimit._source.tiles[0] = 'http://fastmap.navinfo.com/smap_p/plateres/web/condition/' +
            '{z}/{x}/{y}?' + App.Config.platelimit;
        map.removeLayer('polygon_Limited_Layer');
        map.removeLayer('line_Limited_Layer');
        $timeout(function () {
            map.addLayer($scope.polygonLayer);
            map.addLayer($scope.lineLayer);
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
/*    map.on('click','polygon_Limited_Layer',function (e) {
        for(var i = 0; i < e.features.length; i++){
            var group_id = decodeURIComponent(e.features[i].properties.group_id);
            var description = decodeURIComponent(e.features[i].properties.platelimit_desc);
             // console.log(group_id);
            console.log('%c No.'+i ,"color:orange;font-weight:bold",description);
        }
    });
    map.on('click','line_Limited_Layer',function (e) {
        for(var i = 0; i < e.features.length; i++){
            var group_id = decodeURIComponent(e.features[i].properties.group_id);
            var description = decodeURIComponent(e.features[i].properties.platelimit_desc);
             // console.log(group_id);
            console.log('%c No.'+i ,"color:green;font-weight:bold",description);
        }
    });

    map.on('click','polygon_Limited_Layer',function (e) {
        var description = '';
        for(var i = 0; i < e.features.length; i++){
            var group_id = decodeURIComponent(e.features[i].properties.group_id);
           description += decodeURIComponent(e.features[i].properties.platelimit_desc);
            // console.log(group_id);
            console.log('%c No.'+i ,"color:orange;font-weight:bold",description);
        }
        var loc = [];
        var div = window.document.createElement('div');
        /!*  console.log(data.features[0].properties.construction_time);*!/
        div.innerHTML = '<div style="text-align: center">'+ description+'</div>';
        new mapboxgl.Popup()
            .setLngLat([e.lngLat.lng,e.lngLat.lat])
            .setDOMContent(div)
            .addTo(map);
    });
    map.on('click','line_Limited_Layer',function (e) {
           var description = decodeURIComponent(e.features[0].properties.platelimit_desc);
            // console.log(group_id);
        var div = window.document.createElement('div');
        /!*  console.log(data.features[0].properties.construction_time);*!/
        div.innerHTML = '<div style="text-align: center">'+ description+'</div>';
        new mapboxgl.Popup()
            .setLngLat([e.lngLat.lng,e.lngLat.lat])
            .setDOMContent(div)
            .addTo(map);
    });*/

    $scope.changeZoom = function (arg) {
        var nowZoom = map.getZoom();
        if (arg === 'add') {
            map.setZoom(nowZoom + 1);
        } else {
                map.setZoom(nowZoom - 1);
        }
    };

    $scope.lineLayerNew = {
        "id": 'line_Limited_newLayer',
        "type": 'line',
        "source": "platelimitNew",
        'source-layer': 'platelimit_line',
        "minzoom": 5,
        "maxzoom": 17.1,
        "layout": {
            "line-join": "round",
            "visibility": "visible",
            "line-cap": "round"
        },
        "paint": {
            "line-width": {
                "stops": [[6, 1.5], [20, 10]],
                "base": 1.2
            },
            "line-color": "#EE6363",

        }
    }

        //定义线图层
        $scope.originLayer = {
            "id": "route",
            "type": "line",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": []
                    }
                }
            },
            "layout": {
                "line-join": "round",
                "line-cap": "round"

            },
            "paint": {
                "line-color": "rgba(255,114,86)",
                "line-width": 3,
            }
        };

    //地图划线函数
        $scope.addLines = function (data, id, index) {
            $scope.geojson = {
                "type": "FeatureCollection",
                "features": []
            };
            var source = {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": data
                },
                propertires: {
                    id: 'test'
                }
            };

            $scope.geojson.features.push(source);
            map.getSource(id).setData($scope.geojson);
        };

        $scope.getLimitedLine = function (arg) {
            var bounds = {
                type: 'FeatureCollection',
                features: [],
            };

            for (var i = 0, len = arg.length; i < len; i++) {

                var obj = $scope.originLayer;
                obj.id = 'route' + i;
                obj.paint['line-color'] = '#ff7474';
                var source = {
                    "type": "geojson",
                    "data": {
                        "type": "Feature",
                        "properties": {},
                        "geometry": arg[i]
                    }
                };
                $scope.originLayer.source = source;
                map.addLayer($scope.originLayer);
                var pointFeature = turf.lineString(arg[i]);
                bounds.features.push(pointFeature);
            }

            // var bbox = turf.bbox(bounds);
            // var v2 = new mapboxgl.LngLatBounds([bbox[0], bbox[1]], [bbox[2], bbox[3]]);
            // map.fitBounds(v2, {padding: 70});

        }



    //分类搜索
     $scope.searchByClass = function(str){
        $('.testLimited li a').removeClass('selected');
        $(event.target).addClass('selected');

        return str ;

    }

    //点击搜索事件
    $scope.searchInfo = function(){
        $scope.searchByClass();
       console.log('ds');
      console.log($scope.searchByClass());

    }

    //点击今日限行，默认显示一条
    $scope.toTodayLimit = function(){
        var status = $('.limitDaySec').css('display');
        if(status == 'block'){
            $scope.limitDayList = {
                display:'none'
            }
            $scope.changColor = {
                color:'#ff7474'
            }
        }else{
            $scope.limitDayList = {
                display:'block'
            }

        }
        var lineArr = [];
        $http.post('http://fs.navinfo.com/smapapi/plateres/web/cond/td').then(function (data) {
            var val = data.data.data ;
            $scope.initArea = val.platelimit[0].platelimit_area ;
            $scope.initPrinciple = val.platelimit[0].principle ;
            $scope.initCar = val.platelimit[0].pl_condition ;
           // console.log(val.platelimit[0].geometroy.coordinates)
            console.log(val);

            for(var i=0 ,len = val.platelimit.length; i<len ;i++){
                if (val.platelimit[i].group_id == val.platelimit[0].group_id && val.platelimit[i].principle == val.platelimit[0].principle){
                    lineArr.push(val.platelimit[i].geometroy.coordinates);

                }
            }
            console.log(lineArr);
            var bounds = {
                type: 'FeatureCollection',
                features: [],
            };

            for (var i = 0, len = lineArr.length; i < len; i++) {
                var source = {
                    "type": "Feature",
                    "geometry":{
                        "type": "LineString",
                        "coordinates":lineArr[i]
                    },
                };
                var pointFeature = turf.lineString(lineArr[i]);
                bounds.features.push(source);
            }
            var obj = $scope.originLayer;
            obj.paint['line-color'] = 'red';
            $scope.originLayer.source.data = bounds;
            map.addLayer($scope.originLayer);
        })



    }

    //关闭今日限行列表
    $scope.closeList = function(){
        $('.limitTodayLists').hide();
        $('#container').css("width", "100%");
        $('.testLimited').show();
    }


    //今日限行，查看更多
    $scope.moreInfo = function(){
        $('.limitTodayLists').show();
        $('#container').css("width", "87.8%");
        $('.testLimited').hide();
         $http.post('http://fs.navinfo.com/smapapi/plateres/web/cond/td').then(function (data) {
             var val = data.data.data ;
             // $scope.initArea = val.platelimit[0].platelimit_area ;
             // $scope.initPrinciple = val.platelimit[0].principle ;
             // $scope.initCar = val.platelimit[0].pl_condition ;
             var summaryArr = [];
             var areaToday = [];
             var conditionToday = [];
             var principleToday = [];
             var arrNew=[];
             for(var i = 0,len = val.platelimit.length; i<len ;i++){
                 areaToday.push( platelimit_area = val.platelimit[i].platelimit_area);
                 conditionToday.push(val.platelimit[0].pl_condition);
                 principleToday.push(val.platelimit[0].principle);
                 summaryArr = [areaToday,conditionToday,principleToday];


             }
             for(var i=0;i<areaToday.length;i++){
                 if(arrNew.indexOf(areaToday[i])<0){
                     arrNew.push(areaToday[i]);
                 }

             }
             console.log(arrNew);

         })



    }






}]);

