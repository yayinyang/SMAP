/**
 * Created by liwanchong on 2016/12/21.
 */
$(function () {
    $('#apiPage').load('../pages/api/getTileInfomation.html');
});

function changeArithmeticApiPage(type) {
    $('#apiType').text('算法服务型');
    switch (type) {
        case 'ak' :
            $('#showApiName').text('高程值');
            break;
        case 'tollcost' :
            $('#showApiName').text('路劲收费');
            break;
    }

}
function controlDataService() {
    if($('#dataServicePanel').css('display') === 'none') {
        $('#arrow').removeClass('arrowActive').addClass('arrowNormal');
        $('#dataServicePanel').css('display', 'block');
    }else {
        $('#arrow').removeClass('arrowNormal').addClass('arrowActive');
        $('#dataServicePanel').css('display', 'none');
    }


}

var productServiceApp = angular.module('productServiceApp', []);
productServiceApp.controller('selectedController',function ($scope) {
    $scope.dataServiceFlag = '';
    $scope.apiDataNames = [
        { name: '获取瓦片信息', type: 'Tile' },
        { name: '获取图幅属性', type: 'Mesh' },
        { name: 'POI查询', type: 'Pois' },
        { name: '行政区划查询', type: 'Region' },
        { name: '道路名查询', type: 'RoadName' },
        { name: 'link信息查询', type: 'Link' },
        { name: 'layer信息查询', type: 'Layer' },
        { name: '获取layer结构', type: 'LayerStructure' },
    ];
    $scope.algorithmServiceNames = [
        {name: '高程值', type: 'Ak'},
        {name: '路径收费', type: 'Ak'}
    ]
    $scope.changeDataApiPage = function (type, name) {
        $scope.dataServiceFlag = type;
        $('#apiType').text('数据服务型');
        $('#apiPage').empty();
        $('#showApiName').text(name);
        $('#apiPage').load('../pages/api/get' + type + 'Infomation.html');
    };
    $scope.changeArithmeticApiPage = function (type, name) {
        $scope.dataServiceFlag = type;
        $('#apiType').text('算法服务型');
        $('#apiPage').empty();
        $('#showApiName').text(name);
        $('#apiPage').load('../pages/api/get' + type + 'Infomation.html');

    };
})





