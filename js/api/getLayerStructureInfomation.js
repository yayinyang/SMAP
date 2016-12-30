/**
 * Created by liwanchong on 2016/12/30.
 */
$(function () {
    $.post(App.Util.getFullUrl('layers.json'), {},function (data) {
        $('#layersContent').empty();
        $('#layersContent').text(JSON.stringify(data, null, 4));
    });
});
function layersResult() {
    $.post(App.Util.getFullUrl('layers.json'), {},function (data) {
        $('#layersContent').empty();
        $('#layersContent').text(JSON.stringify(data, null, 4));
    });
}
function resetResult() {
    $('#layersContent').empty();
}