/**
 * Created by liwanchong on 2016/12/30.
 */
$(function () {
    var param = {
        level: 19,
        tilex: 431598,
        tiley: 198608
    };
    $.post(App.Util.getFullUrl('base/ar.json'), param, function (data) {
        $('#arContent').empty();
        $('#arContent').text(JSON.stringify(data, null, 4));
    });
});
function arResult() {
    var param = {
        level: $('#arLevel').val(),
        tilex: $('#arTileX').val(),
        tiley: $('#arTileY').val()
    };
    $.post(App.Util.getFullUrl('base/ar.json'), param, function (data) {
        $('#arContent').empty();
        $('#arContent').text(JSON.stringify(data, null, 4));
    });
}
function resetResult() {
    $('#arContent').empty();
}