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
    $scope.direct = {
        Tile: [
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
        ],
        Mesh:[
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
                name: '获取图幅ID',
                id: 'getSingleMesh'
            },
            {
                name: '批量获取图幅ID',
                id: 'getMulitiMeshes'
            },
        ],
        Pois:[
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
        ],
        Region:[
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
                name: '行政区划查询',
                id: 'queryRegion'
            }
        ],
        RoadName:[
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
                name: '单个瓦片道路名查询',
                id: 'singleTileRoadName'
            },{
                name: '多个瓦片道路名查询',
                id: 'mulitiTilesRoadName'
            },
        ],
        Link:[
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
                name: ' 单个瓦片link信息查询',
                id: 'singleTile'
            },
            {
                name: '多个瓦片link信息查询',
                id: 'mulitiTiles'
            },
            {
                name: 'layer内link信息查询',
                id: 'linkInLayer'
            },
            {
                name: '自定义link信息查询',
                id: 'definedLink'
            }
        ],
        Layer:[
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
                name: 'layer信息查询',
                id: 'getLayerInfo'
            }
        ],
        LayerStructure:[
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
                name: '获取layer结构',
                id: 'getLayerStructure'
            }
        ],
        Ak:[
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
                name: '获取高程值',
                id: 'akContainer'
            }
        ],
        Tollcost:[
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
                name: '计算收费金额',
                id: 'tollCostContainer'
            },
        ],
        summary: [
            {
                name: '概述',
                id: 'summary'
            },
            {
                name: '简介',
                id: 'summaryExplain'
            }
        ],
        code: [
            {
                name: '状态码说明',
                id: 'code',
            },
            {
                name: '状态码介绍',
                id: 'codeExplain',
            }
        ]

    };
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
    $scope.jumpHeight = {
        height: '180px'
    };
    $scope.changeDataApiPage = function (parentName,type, name) {
        $scope.jumpFlag = '';
        $scope.jumps = $scope.direct[type];
        $scope.jumpHeight.height = 30 * $scope.jumps.length + 'px';
        $scope.dataServiceFlag = type;
        $('#apiType').text(parentName);
        $('#apiPage').empty();
        $('#showApiName').text(name);
        $('#apiPage').load('../pages/api/get' + type + 'Infomation.html');
    };
    $scope.showArrowDirect = function (type, num) {
        $scope.jumpFlag = '';
        $scope.jumps = $scope.direct[type];
        $scope.jumpHeight.height = 30 * $scope.jumps.length + 'px';
        if (type === 'summary') {
            $('#apiPage').empty();
            $('#apiPage').load('../pages/api/summary.html');
        }
        if (type === 'code') {
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
    };
    $scope.jumpToDiv = function (id) {
        window.location.hash = '#' + id;
        $scope.jumpFlag = id;
        window.scrollTo(0,$('#' + id).position().top-40);
    };
})





