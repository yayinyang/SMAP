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
            $('#showApiName').text('POI查询');
            break;
        case 'region' :
            $('#showApiName').text('行政区划查询');
            break;
        case 'roadName' :
            $('#showApiName').text('道路名查询');
            break;
        case 'link' :
            $('#showApiName').text('link信息查询');
            break;
        case 'layer' :
            $('#showApiName').text('layer信息查询');
            break;
        case 'layerStructure' :
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








