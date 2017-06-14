/**
 * Created by liwanchong on 2016/12/22.
 */
var limitContentData = '';
function init() {
    $("#ak").val(App.Config.limit.ak);
    $.post(App.Config.limit.platelimitUrl), {
        ak:App.Config.limit.ak
    }, function (data) {
        limitContentData = JSON.stringify(data, null, 4);
        $('#limitContent').val(limitContentData);
    }
}
$(function () {
    init();
/*    var limitParam = {
        ak: E485214565fetch087qwde70,
        filename:2017011401,
    };
    $.post(App.Util.getFullUrl('platelimit/hour.csv'), limitParam, function (data) {
        $('#limitContent').empty();
        $('#limitContent').text(JSON.stringify(data, null, 4));
    });*/
});
function limitResult() {
    $.post(App.Config.limit.platelimitUrl, {
        ak: $('#ak').val()
    }, function (data) {
        $('#limitContent').val(JSON.stringify(data, null, 4));
    });
}
function resetResult() {
    $("#ak").val(App.Config.limit.ak);
    $('#limitContent').val(limitContentData);
}
/*

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

*/
