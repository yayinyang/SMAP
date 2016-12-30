/**
 * Created by liwanchong on 2016/12/30.
 */
$(function () {
    var param = {
        layer: 'LINK_FC3'
    };
    $.post(App.Util.getFullUrl('layer/description.json'), param, function (data) {
        $('#descriptionContent').empty();
        $('#descriptionContent').text(JSON.stringify(data, null, 4));
    });
});
function descriptionResult() {
    var param = {
        layer: $('#descriptionLayer').val()
    };
    $.post(App.Util.getFullUrl('layer/description.json'), param, function (data) {
        $('#descriptionContent').empty();
        $('#descriptionContent').text(JSON.stringify(data, null, 4));
    });
}
function resetResult() {
    $('#descriptionContent').empty();
}