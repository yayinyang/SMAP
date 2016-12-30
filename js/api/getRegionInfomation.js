/**
 * Created by liwanchong on 2016/12/30.
 */
$(function () {
    var param = {
        name: '北京'
    };
    $.post(App.Util.getFullUrl('region/info.json'), param, function (data) {
        $('#regionContent').empty();
        $('#regionContent').text(JSON.stringify(data, null, 4));
    });
});
function regionResult() {
    var param = {
        name: $('#regionName').val()
    };
    $.post(App.Util.getFullUrl('region/info.json'), param, function (data) {
        $('#regionContent').empty();
        $('#regionContent').text(JSON.stringify(data, null, 4));
    });
}
function resetResult() {
    $('#regionContent').empty();
}