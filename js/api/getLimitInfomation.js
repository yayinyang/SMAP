/**
 * Created by liwanchong on 2016/12/22.
 */
$(function () {
    var limitParam = {
        ak: E485214565fetch087qwde70,
        filename:2017011401,
    };
    $.post(App.Util.getFullUrl('platelimit/hour.csv'), limitParam, function (data) {
        $('#limitContent').empty();
        $('#limitContent').text(JSON.stringify(data, null, 4));
    });
});
function limitResult() {
    var ak = $('#ak').val();
    var filename = $('#filename').val();
    var param = {
        ak: ak,
        filename: filename,
    };
    $.post(App.Util.getFullUrl('platelimit/hour.csv'), param, function (data) {
        $('#limitContent').empty();
        $('#limitContent').text(JSON.stringify(data, null, 4));
    });
}

function limitDateResult() {
    var ak = $('#limitparam1').val();
    var date = $('#limitparam2').val();
    var param = {
        ak: ak,
        date: date,
    };
    $.post(App.Util.getFullUrl('platelimit/query'), param, function (data) {
        $('#limitDateContent').empty();
        $('#limitDateContent').text(JSON.stringify(data, null, 4));
    });
}

function resetResult(type) {
    if(type === 0) {
        $('#limitDateContent').empty();
        return;
    }
    $('#limitContent').empty();
}