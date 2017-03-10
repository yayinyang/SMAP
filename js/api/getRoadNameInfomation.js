/**
 * Created by liwanchong on 2016/12/30.
 */
$(function () {
    var rdLinksParam = {
        level: 19,
        tilex: 431460,
        tiley: 198568
    };
    $.post(App.Util.getFullUrl('base/tile/rdlinks.json'), rdLinksParam, function (data) {
        $('#rdLinksContent').empty();
        $('#rdLinksContent').text(JSON.stringify(data, null, 4));
    });
    var poisParam = {
        level: 19,
        tiles: '431460,198568;431534,198511'
    };
    $.post(App.Util.getFullUrl('base/tiles/pois.json'), poisParam, function (data) {
        $('#poisContent').empty();
        $('#poisContent').text(JSON.stringify(data, null, 4));
    });
})
function rdLinksResult() {
    var param = {
        level: $('#rdLinksLevel').val(),
        tilex: $('#rdLinksTileX').val(),
        tiley: $('#rdLinksTileY').val()
    };
    $.post(App.Util.getFullUrl('base/tile/rdlinks.json'), param, function (data) {
        $('#rdLinksContent').empty();
        $('#rdLinksContent').text(JSON.stringify(data, null, 4));
    });
}
function poisResult() {
    var param = {
        level: $('#poisLevel').val(),
        tiles: $('#poisTiles').val()
    };
    $.post(App.Util.getFullUrl('base/tiles/pois.json'), param, function (data) {
        $('#poisContent').empty();
        $('#poisContent').text(JSON.stringify(data, null, 4));
    });
}
function resetResult(type) {
    if(type === 0) {
        $('#rdLinksContent').empty();
        return;
    }
    $('#poisContent').empty();
}