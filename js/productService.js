/**
 * Created by liwanchong on 2016/12/21.
 */
$(function () {
    $('#apiPage').load('../pages/api/getTileInfomation.html');
});
var productServiceApp = angular.module('productServiceApp', []);
productServiceApp.controller('selectedController',function ($scope) {
    $scope.services = [
        {
            name: '概述',
            flag: false,
            type: 'summary'
        },
        {
            name: 'API参考手册',
            flag: true,
            type: 'referenceManual',
            children: [
                {
                    name: '数据服务型',
                    type: 'dataService',
                    children: [
                        {
                            name: '获取瓦片信息',
                            type: 'Tile'
                        },
                        {
                            name: '获取图幅属性',
                            type: 'Mesh'
                        },
                        {
                            name: 'POI查询', type: 'Pois'
                        },
                        {
                            name: '行政区划查询',
                            type: 'Region'
                        },
                        {
                            name: '道路名查询',
                            type: 'RoadName'
                        },
                        {
                            name: 'link信息查询',
                            type: 'Link'
                        },
                        {
                            name: 'layer信息查询',
                            type: 'Layer'
                        },
                        {
                            name: '获取layer结构',
                            type: 'LayerStructure'
                        },
                    ]
                },
                {
                    name: '算法服务型',
                    type: 'algorithmService',
                    children: [
                        {
                            name: '高程值',
                            type: 'Ak'
                        },
                        {
                            name: '路径收费',
                            type: 'Ak'
                        }
                    ]
                }


            ]
        },
        {
            name: '状态码说明',
            type: 'code',
            flag: false
        }
    ];
    $scope.dataServiceFlag = '';
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
    $scope.showArrowDirect = function (type, num) {

        if(type === 'summary') {
            $('#apiPage').empty();
            $('#apiPage').load('../pages/api/summary.html');
        }
        if(type === 'code') {
            $('#apiPage').empty();
            $('#apiPage').load('../pages/api/codeDescription.html');
        }

        $scope.services.forEach(function (item, index) {
            if (index === num) {
                item.flag = !item.flag;
            } else {
                item.flag = false;
            }
        });
    }
})





