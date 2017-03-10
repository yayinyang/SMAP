/**
 * Created by liwanchong on 2017/3/9.
 */
var tollGate = angular.module("tollGate", ['dataService', 'nvd3', 'angular-popups']);
tollGate.controller("tollGateController", ['$scope', 'dsEdit', '$location', function ($scope, dsEdit, $location) {
    $scope.param = {
        name: '福建'
    };
    $scope.popuArr = [];
    $scope.clearLines = function () {
        var geojson = {
            "type": "FeatureCollection",
            "features": []
        };
        map.getSource('route').setData(geojson);
        for (var i = 0, len = $scope.popuArr.length; i < len; i++) {
            $scope.popuArr[i].remove();
        }
        $scope.popuArr.length = 0;
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
    dsEdit.getProduct('tollgate/tollnames/31/1',  $scope.param).then(function (data) {
        console.log(data);
    });
    dsEdit.getProduct('tollgate/path/2038/436328').then(function (data) {
        var source = {
            "type": "geojson",
            "data": {
                "type": "Feature",
                "properties": {},
                "geometry": data[0].geoJson
            }
        };
        map.flyTo({center: data[0].pointGeoJson.coordinates});
        var popup = new mapboxgl.Popup({closeOnClick: false})
          .setLngLat(data[0].pointGeoJson.coordinates)
          .setHTML('<h1>Hello World!</h1>')
          .addTo(map);
        $scope.popuArr.push(popup);
        $scope.originLayer.source = source;
        map.addLayer($scope.originLayer);
    });
    $scope.addLines = function () {
        $scope.geojson = {
            "type": "FeatureCollection",
            "features": []
        };
        dsEdit.getProduct('tollgate/path/2038/436328').then(function (data) {
            var source = {
                "type": "Feature",
                "geometry":data[0].geoJson,
                propertires: {
                    id: 'test'
                }
            };
            map.flyTo({center: data[0].pointGeoJson.coordinates});
            var popup = new mapboxgl.Popup({closeOnClick: false})
              .setLngLat(data[0].pointGeoJson.coordinates)
              .setHTML('<h1>Hello World!</h1>')
              .addTo(map);
            $scope.popuArr.push(popup);
            // $scope.originLayer.source = source;
            $scope.geojson.features.push(source)
            map.getSource('route').setData($scope.geojson);
        });
    }
}]);