/**
 * Created by liwanchong on 2017/3/9.
 */
var tollGate = angular.module("tollGate", ['dataService', 'nvd3', 'angular-popups']);
tollGate.controller("tollGateController", ['$scope', 'dsEdit', '$location', '$anchorScroll', function (
  $scope, dsEdit, $location, $anchorScroll) {
    $scope.param = {
        name: '福建'
    };
    $scope.startTollGate = '';
    $scope.endTollGate = '';
    $scope.tollGateArr = [];
    $scope.popuArr = [];
    $scope.startFlag = false;
    $scope.endFlag = false;
    $scope.startPid = '';
    $scope.endPid = '';
    $scope.provincePid = 1;
    $scope.provinceArr = province;
    $scope.captureArr = ['A','B','C','F','G','H','J','L','N','Q','S','T','X','Y','Z'];
    $scope.printNotice = "";
    $scope.endStationStyle = {
        'border-bottom':'none'
    };
    $scope.originLayer = {
        "id": "route",
        "type": "line",
        "source": {
            "type": "geojson",
            "data": {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates":[]
                }
            }
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "red",
            "line-width": 8
        }
    };
    $scope.linksArr = [];
    $scope.colorArr = ['#85b3e7', '#85b3e7', '#85b3e7'];
    $scope.noSearchResult = {
        display: 'none',
        height: 30 + 'px',
        'line-height': 30 + 'px',
        'background-color': '#ffffff'
    }
    // 清空
    $scope.clearLines = function () {
        var geojson = {
            "type": "FeatureCollection",
            "features": []
        };
        for (var i = 0, len = $scope.popuArr.length; i < len; i++) {
            map.getSource('route'+i).setData(geojson);
            $scope.popuArr[i].remove();
        }
        $scope.popuArr.length = 0;
    };
    $scope.addLines = function (data, id) {
        $scope.geojson = {
            "type": "FeatureCollection",
            "features": []
        };
        var source = {
            "type": "Feature",
            "geometry": data.geoJson,
            propertires: {
                id: 'test'
            }
        };
        $scope.createPop(data);
        $scope.geojson.features.push(source);
        map.getSource(id).setData($scope.geojson);
    };
    $scope.emptyInput = function (arg){
        if(arg === 'startStation'){
            $scope.startTollGate = '';
            $scope.searchStartTollGate();
            $scope.startPid = '';
        }else{
            $scope.endTollGate = '';
            $scope.searchEndTollGate();
            $scope.endPid = '';
        }
    }
    // 获取省 并定位
    $scope.locationProvince = function (data) {
        $scope.provincePid = data.id;
        map.flyTo({center:[ data.point.x, data.point.y]});
    };
    // 生成弹出框
    $scope.createPop = function (data) {
        var popup = new mapboxgl.Popup({closeOnClick: false})
          .setLngLat(data.pointGeoJson.coordinates)
          .setHTML(data.fee+ '元')
          .addTo(map);
        $scope.popuArr.push(popup);
    };
    // 搜索起点
    $scope.searchStartTollGate = function () {
        dsEdit.getProduct('tollgate/tollnames/' + $scope.provincePid + '/1', { name: $scope.startTollGate }).then(function (data) {
            $scope.startFlag = true;
            $scope.endFlag = false;
            $scope.printNotice = "";
            $scope.tollGateArr = data;
            if($scope.tollGateArr.length == 0){
                $scope.noSearchResult = {
                    display: 'block',
                    height: 30 + 'px',
                    'line-height': 30 + 'px',
                    'background-color': '#ffffff'
                };
                $scope.endStationStyle = {
                    'border-bottom':'1px solid #d0e4ff'
                };
                $scope.printNotice = "无搜索结果，请重新输入";
            }else {
                $scope.endStationStyle = {
                    'border-bottom':'1px solid #d0e4ff'
                };
                $scope.noSearchResult = {
                    display: 'none',
                    height: 30 + 'px',
                    'line-height': 30 + 'px',
                    'background-color': '#ffffff'
                };
            }
        });

    };
    // 搜索终点
    $scope.searchEndTollGate = function () {
        dsEdit.getProduct('tollgate/tollnames/sec/' + $scope.startPid + '/1', { name: $scope.endTollGate }).then(function (data) {
            $scope.startFlag = false;
            $scope.endFlag = true;
            $scope.printNotice = "";
            $scope.tollGateArr = data;
            if($scope.tollGateArr.length == 0){
                 $scope.noSearchResult = {
                display: 'block',
                height: 30 + 'px',
                'line-height': 30 + 'px',
                'background-color': '#ffffff'
                };
                $scope.endStationStyle = {
                    'border-bottom':'1px solid #d0e4ff'
                };
                $scope.printNotice = "无搜索结果，请重新输入";
            }else {
                $scope.endStationStyle = {
                    'border-bottom':'1px solid #d0e4ff'
                };
                $scope.noSearchResult = {
                display: 'none',
                 height: 30 + 'px',
                'line-height': 30 + 'px',
                'background-color': '#ffffff'
                };
            }
        });
    };
    // 获取起点和终点的pid
    $scope.getPidFromSearch = function (data) {
     if ($scope.startFlag) {
         $scope.startPid = data.pid;
         $scope.startTollGate = data.name;
         $scope.startFlag = false;
         $scope.tollGateArr.length = 0;
         $scope.endStationStyle = {
             'border-bottom':'none'
         };

     }
     if ($scope.endFlag) {
         $scope.endPid = data.pid;
         $scope.endTollGate = data.name;
         $scope.endFlag = false;
         $scope.tollGateArr.length = 0;
         $scope.endStationStyle = {
             'border-bottom':'none'
         };
     }
    };
    // 获取路径
    $scope.getLinksFromStartToEnd = function () {
        $scope.clearLines();
        if($scope.startPid == ''){
            $scope.noSearchResult = {
                display: 'block',
                height: 30 + 'px',
                'line-height': 30 + 'px',
                'background-color': '#ffffff'
            };
            $scope.endStationStyle = {
                'border-bottom':'1px solid #d0e4ff'
            };
            $scope.printNotice = "请选择起点收费站";
        }else if($scope.endPid == ''){
                $scope.noSearchResult = {
                    display: 'block',
                    height: 30 + 'px',
                    'line-height': 30 + 'px',
                    'background-color': '#ffffff'
                };
            $scope.endStationStyle = {
                'border-bottom':'1px solid #d0e4ff'
            };
                $scope.printNotice = "请选择终点收费站";
        }else{
            dsEdit.getProduct('tollgate/path/'+$scope.startPid+'/'+$scope.endPid).then(function (data) {
                map.flyTo({center: data[0].pointGeoJson.coordinates});
                $scope.linksArr = data;
                for (var i = 0, len = data.length; i < len ;i++) {
                    if(map.getSource('route'+i)) {
                        $scope.addLines(data[i], 'route'+i);
                    } else {
                        var obj = $scope.originLayer;
                        obj.id = 'route' + i;
                        obj.paint['line-color'] = $scope.colorArr[i];
                        var source = {
                            "type": "geojson",
                            "data": {
                                "type": "Feature",
                                "properties": {},
                                "geometry": data[i].geoJson
                            }
                        };
                        $scope.createPop(data[i]);
                        $scope.originLayer.source = source;
                        map.addLayer($scope.originLayer);
                    }
                }
            });
        }
    };
    $scope.goCapture = function (data){
        var local = 'capture'+data;
       $location.hash(local);
        $anchorScroll();
    }
}]);