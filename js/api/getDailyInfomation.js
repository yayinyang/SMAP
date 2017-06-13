/**
 * Created by liwanchong on 2016/12/22.
 */
function initList() {
    var limitParam = {
        ak:App.Config.daily.ak,
        spec:"nimif-g"
    };
    $.post(App.Config.daily.queryUrl, limitParam, function (data) {
        $('#dailyListContent').empty();
        $('#dailyListContent').text(JSON.stringify(data, null, 4));
    });
}
function initDl() {
    $.post(App.Config.daily.downloadUrl, {
        ak:App.Config.daily.ak,
        product_id:"MIFG_17SUM_D_BJ_CSV_0317_10"
    }, function (data) {
        $('#dailyContent').empty();
        $('#dailyContent').text(JSON.stringify(data, null, 4));
    });
}
$(function () {
    initList();
    initDl();
});
function dailyListResult() {
    var ak = $('#ak').val();
    var spec = $('#spec').val();
    var param = {
        ak: ak,
        spec: spec,
    };
    $.post(App.Config.daily.queryUrl, param, function (data) {
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
    /*$.post(App.Util.getFullUrl('data/download'), param, function (data) {*/
    $.post(App.Config.daily.downloadUrl, param, function (data) {
        $('#dailyContent').empty();
        $('#dailyContent').text(JSON.stringify(data, null, 4));
    });
}

function resetResult(type) {
    if(type === 1) {
        initList();
        return;
    }
    initDl();
}