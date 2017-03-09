/**
 * Created by liwanchong on 2016/12/30.
 */
$(function () {
    var rdLinkParam = {
        layer: 'LINK_FC3',
        level: 19,
        tilex: 431543,
        tiley: 198512
    };
    $.post(App.Util.getFullUrl('base/layer/rdlink.json'), rdLinkParam, function (data) {
        $('#rdLinkContent').empty();
        $('#rdLinkContent').text(JSON.stringify(data, null, 4));
    });
    var rdLinksParam = {
        layers: 'LINK_FC3,LINK_FC5',
        levels: '19,19',
        tilexy: '431534,198512,431534,198513',
    };
    console.log(rdLinksParam.toString());
    $.post(App.Util.getFullUrl('base/layers/rdlink.json'), rdLinksParam, function (data) {
        $('#rdLinksContent').empty();
        $('#rdLinksContent').text(JSON.stringify(data, null, 4));
    });
    var numRdLinkParam = {
        layer: 'LINK_FC3',
        num: 2
    };
    $.post(App.Util.getFullUrl('base/layer/numrdlink.json'), numRdLinkParam, function (data) {
        $('#numRdLinkContent').empty();
        $('#numRdLinkContent').text(JSON.stringify(data, null, 4));
    });
    var indexParam = {
        layer: 'LINK_FC3',
        attributes: 'LINK_ID',
        values: '304348,312332'
    };
    $.post(App.Util.getFullUrl('base/layer/index.json'), indexParam, function (data) {
        $('#indexContent').empty();
        $('#indexContent').text(JSON.stringify(data, null, 4));
    });
});
function rdLinkResult() {
    var param = {
        layer: $('#rdLinkLayers').val(),
        level: $('#rdLinkLevel').val(),
        tilex: $('#rdLinkTileX').val(),
        tiley: $('#rdLinkTileY').val()
    };
    $.post(App.Util.getFullUrl('base/layer/rdlink.json'), param, function (data) {
        $('#rdLinkContent').empty();
        $('#rdLinkContent').text(JSON.stringify(data, null, 4));
    });
}
function rdLinksResult() {
    var param = {
        layers: $('#rdLinksLayers').val(),
        level:  $('#rdLinksLevel').val(),
        tilexy: $('#rdLinksTileXY').val(),
    };
    $.post(App.Util.getFullUrl('base/layers/rdlink.json'), param, function (data) {
        $('#rdLinksContent').empty();
        $('#rdLinksContent').text(JSON.stringify(data, null, 4));
    });
}
function numRdLinkResult() {
    var param = {
        layer: $('#numRdLinkLayer').val(),
        num: $('#numRdLinkNum')
    };
    $.post(App.Util.getFullUrl('base/layer/numrdlink.json'), param, function (data) {
        $('#numRdLinkContent').empty();
        $('#numRdLinkContent').text(JSON.stringify(data, null, 4));
    });
}
function indexResult() {
    var param = {
        layer: $('#indexLayer').val(),
        attributes: $('#indexAttributes').val(),
        values: $('#indexValues').val()
    };
    $.post(App.Util.getFullUrl('base/layer/index.json'), param, function (data) {
        $('#indexContent').empty();
        $('#indexContent').text(JSON.stringify(data, null, 4));
    });
}
function resetResult(type) {
    if(type === 0) {
        $('#rdLinkContent').empty();
    } else if(type === 1) {
        $('#rdLinksContent').empty();
    } else if(type === 2) {
        $('#numRdLinkContent').empty();
    } else {
        $('#indexContent').empty();
    }
}