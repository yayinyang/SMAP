/**
 * Created by liwanchong on 2016/12/22.
 */
var specData = "nimif-g";
var dailyListContentData = '';
var dailyparam2Data = "MIFG_17SUM_D_BJ_CSV_0317_10";
var dailyContentData = '';

function initList() {
    $("#ak").val(App.Config.daily.ak);
    $("#spec").val(specData);

    $.post(App.Config.daily.queryUrl, {
        ak:App.Config.daily.ak,
        spec:specData
    }, function (data) {
        dailyListContentData = JSON.stringify(data, null, 4);
        $('#dailyListContent').val(dailyListContentData);
    });
}
function dailyListResult() {
    $.post(App.Config.daily.queryUrl, {
        ak: $('#ak').val(),
        spec: $('#spec').val(),
    }, function (data) {
        $('#dailyListContent').val(JSON.stringify(data, null, 4));
    });
}
function resetResult(type) {
    if( 0 === type) {
        $("#ak").val(App.Config.daily.ak);
        $("#spec").val(specData);
        $('#dailyListContent').val(dailyListContentData);
        return;
    }
    $("#dailyparam1").val(App.Config.daily.ak);
    $("#dailyparam2").val(dailyparam2Data);
    $('#dailyContent').val(dailyContentData);
}

function initDl() {
    $("#dailyparam1").val(App.Config.daily.ak);
    $("#dailyparam2").val(dailyparam2Data);
    $.post(App.Config.daily.downloadUrl, {
        ak:App.Config.daily.ak,
        product_id:"MIFG_17SUM_D_BJ_CSV_0317_10"
    }, function (data) {
        dailyContentData = JSON.stringify(data, null, 4);
        $('#dailyContent').val(dailyContentData);
    });
}
$(function () {
    initList();
    initDl();
});


function dailyResult() {
    /*$.post(App.Util.getFullUrl('data/download'), param, function (data) {*/
    $.post(App.Config.daily.downloadUrl, {
        ak: $('#dailyparam1').val(),
        product_id: $('#dailyparam2').val(),
    }, function (data) {
        $('#dailyContent').val(JSON.stringify(data, null, 4));
    });
}

