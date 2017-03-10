/**
 * Created by liwanchong on 2017/3/9.
 */
var tollGate = angular.module("tollGate", ['dataService', 'nvd3', 'angular-popups']);
tollGate.controller("tollGateController", ['$scope', 'dsEdit', '$location', function ($scope, dsEdit, $location) {
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
    $scope.colorArr = ['red', 'blue', 'gray']
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
    // 生成弹出框
    $scope.createPop = function (data) {
        var popup = new mapboxgl.Popup({closeOnClick: false})
          .setLngLat(data.pointGeoJson.coordinates)
          .setHTML('<h1>Hello World!</h1>')
          .addTo(map);
        $scope.popuArr.push(popup);
    };
    // 搜索起点
    $scope.searchStartTollGate = function () {
        dsEdit.getProduct('tollgate/tollnames/31/1', {name: $scope.startTollGate}).then(function (data) {
            $scope.startFlag = true;
            $scope.endFlag = false;
            $scope.tollGateArr = data;
        });
    };
    // 搜索终点
    $scope.searchEndTollGate = function () {
        dsEdit.getProduct('tollgate/tollnames/sec/' + $scope.startPid + '/1', { name: $scope.endTollGate }).then(function (data) {
            $scope.startFlag = false;
            $scope.endFlag = true;
            $scope.tollGateArr = data;
        });
    };
    // 获取起点和重点的pid
    $scope.getPidFromSearch = function (data) {
     if ($scope.startFlag) {
         $scope.startPid = data.pid;
         $scope.startTollGate = data.name;
         $scope.startFlag = false;
         $scope.tollGateArr.length = 0;

     }
     if ($scope.endFlag) {
         $scope.endPid = data.pid;
         $scope.endTollGate = data.name;
         $scope.endFlag = false;
         $scope.tollGateArr.length = 0;
     }
    };
    // 获取路径
    $scope.getLinksFromStartToEnd = function () {
        $scope.clearLines();
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
    };
}]);