/**
 * Created by liwanchong on 2016/12/22.
 */
var constructionContentData = '';
var timequantumContentData = '';
function  constructionInit() {
    $('#ak').val(App.Config.construction.constructionAk);
    $("#timequantumAk").val(App.Config.construction.timequantumAk);
    $("#startTime").val(App.Config.construction.timequantumStartTime);
    $("#endTime").val(App.Config.construction.timequantumEndTime);
    $.post(App.Config.construction.constructionUrl, {
        ak: App.Config.construction.constructionAk,
    }, function (data) {
        constructionContentData =JSON.stringify(data, null, 4);
        $('#constructionContent').empty();
        $('#constructionContent').text(constructionContentData);
    });
    $.post(App.Config.construction.timequantumUrl, {
        ak: App.Config.construction.timequantumAk,
        startTime:App.Config.construction.timequantumStartTime,
        endTime:App.Config.construction.timequantumEndTime
    }, function (data) {
        timequantumContentData =JSON.stringify(data, null, 4);
        $('#timequantumContent').empty();
        $('#timequantumContent').text(timequantumContentData);
    });
}
$(function () {
    constructionInit();
});
function constructionRs() {
    var param = {
        ak:  $('#ak').val(),
    };
    $.post(App.Config.construction.constructionUrl, param, function (data) {
        $('#constructionContent').empty();
        $('#constructionContent').text(JSON.stringify(data, null, 4));
    });
}
function constructionResult() {
    $.post(App.Config.construction.timequantumUrl, {
        ak: $('#ak').val(),
        startTime:$("#startTime").val(),
        endTime:$("#endTime").val()
    }, function (data) {
        $('#timequantumContent').empty();
        $('#timequantumContent').text(JSON.stringify(data, null, 4));
    });
}
function resetResult(type) {
    if(type === 0) {
        $('#ak').val(App.Config.construction.constructionAk);
        $('#constructionContent').text(constructionContentData);
        return;
    }
    $("#timequantumAk").val(App.Config.construction.timequantumAk);
    $("#startTime").val(App.Config.construction.timequantumStartTime);
    $("#endTime").val(App.Config.construction.timequantumEndTime);
    $('#timequantumContent').text(timequantumContentData);
}