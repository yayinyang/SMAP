/**
 * Created by liwanchong on 2016/12/22.
 */
$(function () {
    var constructionParam = {
        ak: E505645785fetch087ycde71,
    };

    $.post(App.Util.getFullUrl('construction.csv'), constructionParam, function (data) {
        $('#constructionContent').empty();
        $('#constructionContent').text(JSON.stringify(data, null, 4));
    });
    $()
});
function constructionResult() {
    var ak = $('#ak').val();
    var param = {
        ak: ak,
    };
    $.post(App.Util.getFullUrl('construction.csv'), param, function (data) {
        $('#tileContent').empty();
        $('#tileContent').text(JSON.stringify(data, null, 4));
    });
}
function resetResult(type) {
    if(type === 0) {
        $('#constructionContent').empty();
        return;
    }
}