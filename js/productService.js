/**
 * Created by liwanchong on 2016/12/21.
 */
$(function () {
    $('#apiPage').load('../pages/api/getTileInfomation.html');
});
function changeDataApiPage(type) {
    $('#apiType').text('数据服务型');
    switch (type) {
        case  'tile' :
            $('#apiPage').empty();
            $('#apiPage').load('../pages/api/getTileInfomation.html');
            $('#showApiName').text('获取瓦片信息');
            break;
        case 'mesh' :
            $('#apiPage').empty();
            $('#apiPage').load('../pages/api/getMeshInfomation.html');
            $('#showApiName').text('获取图幅属性');
            break;
        case 'poi' :
            $('#apiPage').empty();
            $('#apiPage').load('../pages/api/getPoisInfomation.html');
            $('#showApiName').text('POI查询');
            break;
        case 'region' :
            $('#apiPage').empty();
            $('#apiPage').load('../pages/api/getRegionInfomation.html');
            $('#showApiName').text('行政区划查询');
            break;
        case 'roadName' :
            $('#apiPage').empty();
            $('#apiPage').load('../pages/api/getRoadNameInfomation.html');
            $('#showApiName').text('道路名查询');
            break;
        case 'link' :
            $('#apiPage').empty();
            $('#apiPage').load('../pages/api/getLinkInfomation.html');
            $('#showApiName').text('link信息查询');
            break;
        case 'layer' :
            $('#apiPage').empty();
            $('#apiPage').load('../pages/api/getLayerInfomation.html');
            $('#showApiName').text('layer信息查询');
            break;
        case 'layerStructure' :
            $('#apiPage').empty();
            $('#apiPage').load('../pages/api/getLayerStructureInfomation.html');
            $('#showApiName').text('获取layer结构');
            break;
    }
}
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








