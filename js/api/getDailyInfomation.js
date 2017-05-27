/**
 * Created by liwanchong on 2016/12/22.
 */
$(function () {
    var limitParam = {
        ak: E782445785fetch087mkde11,
        spec:nimif-g,
    };
    $.post(App.Util.getFullUrl('data/query'), limitParam, function (data) {
        $('#dailyListContent').empty();
        $('#dailyListContent').text(JSON.stringify(data, null, 4));
    });
});
function dailyListResult() {
    var ak = $('#ak').val();
    var spec = $('#spec').val();
    var param = {
        ak: ak,
        spec: spec,
    };
    $.post(App.Util.getFullUrl('data/query'), param, function (data) {
        $('#dailyListContent').empty();
        $('#dailyListContent').text(JSON.stringify(data, null, 4));
    });
}

function dailyResult() {
    var ak = $('#dailyparam1').val();
    var product_id = $('#dailyparam2').val();
    var param = {
        ak: ak,
        product_id: product_id,
    };
    $.post(App.Util.getFullUrl('data/download'), param, function (data) {
        $('#dailyContent').empty();
        $('#dailyContent').text(JSON.stringify(data, null, 4));
    });
}

function resetResult(type) {
    if(type === 1) {
        $('#dailyListContent').empty();
        return;
    }
    $('#dailyContent').empty();
}