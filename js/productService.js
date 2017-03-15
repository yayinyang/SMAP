/**
 * Created by liwanchong on 2016/12/21.
 */
$(function () {
    $('#apiPage').load('../pages/api/getTileInfomation.html');
});
var productServiceApp = angular.module('productServiceApp', []);
productServiceApp.controller('selectedController',function ($scope,JumpConstant) {
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
                            name: 'POI查询',
                            type: 'Pois'
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
                            type: 'Tollcost'
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
    $scope.jumps = [
        {
            name: '瓦片信息',
            id: 'apiName'
        },
        {
            name: 'API介绍',
            id: 'apiExplain'
        },
        {
            name: '适用场景',
            id: 'useCase'
        },
        {
            name: '使用说明',
            id: 'instructions'
        },
        {
            name: '获取瓦片ID',
            id: 'tileNumber'
        },
        {
            name: '批量获取瓦片ID',
            id: 'tilesNumber'
        }
    ];
    $scope.dataServiceFlag = '';
    $scope.jumpFlag = '';
    $scope.arrowFlag = true;
    $scope.jumpHeight = {
        height: '180px'
    };
    $scope.changeDataApiPage = function (parentName,type, name) {
        $scope.arrowFlag = true;
        $scope.jumpFlag = '';
        $scope.jumps = JumpConstant[type];
        $scope.jumpHeight.height = 30 * $scope.jumps.length + 'px';
        $scope.dataServiceFlag = type;
        $('#apiType').text(parentName);
        $('#apiPage').empty();
        $('#showApiName').text(name);
        $('#apiPage').load('../pages/api/get' + type + 'Infomation.html');
    };
    $scope.showArrowDirect = function (service, num) {
        $scope.arrowFlag = false;
        $('#apiType').text(service.name);
        $('#showApiName').empty();
        $scope.jumpFlag = '';
        $scope.jumps = JumpConstant[service.type];
        $scope.jumpHeight.height = 30 * $scope.jumps.length + 'px';
        if (service.type === 'summary') {
            $('#apiPage').load('../pages/api/summary.html');
        }
        if (service.type === 'code') {
            $('#apiPage').load('../pages/api/codeDescription.html');
        }

        $scope.services.forEach(function (item, index) {
            if (index === num) {
                item.flag = !item.flag;
            } else {
                item.flag = false;
            }
        });
    };
    $scope.jumpToDiv = function (id) {
        if(id === 'apiName'){
            window.scrollTo(0,0);
        }else{
            window.location.hash = '#' + id;
            $scope.jumpFlag = id;
            window.scrollTo(0,$('#' + id).position().top-40);
        }
    };
    angular.element(window.document).bind('scroll',function(){
        console.log('ddd');
    })
})





