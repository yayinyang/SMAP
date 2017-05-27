/**
 * Created by liwanchong on 2017/1/4.
 */
productServiceApp.constant('JumpConstant', {
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
            name: '批量获取瓦片',
            id: 'tilesNumber'
        }
    ],
    Mesh: [
        {
            name: '获取图幅信息',
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
            name: '批量获取图幅',
            id: 'getMulitiMeshes'
        },
    ],
    Pois: [
        {
            name: 'POI查询',
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
            name: '经纬度查询',
            id: 'queryLatLon'
        },
        {
            name: '瓦片查询',
            id: 'queryTiles'
        },
        {
            name: '批量瓦片查询',
            id: 'multiQueryTiles'
        },
        {
            name: '相似POI名称',
            id: 'likePoiName'
        },
        {
            name: '相似POI坐标',
            id: 'likePoiCoordinate'
        }, {
            name: 'POI的ID查询',
            id: 'idOfPOI'
        },
        {
            name: '图幅餐饮类',
            id: 'restaurantOfMesh'
        },
        {
            name: '瓦片餐饮类',
            id: 'restaurantOfTiles'
        }
    ],
    Region: [
        {
            name: '行政区划查询',
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
    RoadName: [
        {
            name: '道路名查询',
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
            name: '获取道路名称',
            id: 'singleTileRoadName'
        }, {
            name: '批量获取名称',
            id: 'mulitiTilesRoadName'
        },
    ],
    Link: [
        {
            name: 'link信息查询',
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
            name: ' 获取瓦片Link',
            id: 'singleTile'
        },
        {
            name: '批量获取瓦片',
            id: 'mulitiTiles'
        },
        {
            name: 'layer查询',
            id: 'linkInLayer'
        },
        {
            name: '自定义查询',
            id: 'definedLink'
        }
    ],
    Layer: [
        {
            name: 'layer信息查询',
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
    LayerStructure: [
        {
            name: '获取layer结构',
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
    Ak: [
        {
            name: '高程值',
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
    Tollcost: [
        {
            name: '路径收费',
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
        {
            name: '用户反馈接口',
            id: 'feedbackContainer'
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
    ],
    Construction: [
        {
            name: '施工道路信息',
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
            name: '获取施工信息',
            id: 'constructionNumber'
        },
        {
            name: '用户反馈接口',
            id: 'feedbackContainer'
        }
    ],
    Daily: [
        {
            name: '日出品信息',
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
            name: '获取下载列表',
            id: 'constructionNumber'
        },
        {
            name: '下载信息接口',
            id: 'feedbackContainer'
        }
    ],
    Limit: [
        {
            name: '限行限号信息',
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
            name: '获取最新信息',
            id: 'limitNumber'
        },
        {
            name: '查询指定信息',
            id: 'queryDateContainer'
        }
    ]

});