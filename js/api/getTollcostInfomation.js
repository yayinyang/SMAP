/**
 * Created by liwanchong on 2016/12/30.
 */
$(function () {
    var param = {
        coordinates:
        {"coordinates":[{"route":"L1","coordinates":"116.33308,39.93806, 116.33304,39.93806, 116.33300,39.93807, 116.33296,39.93807, 116.33290,39.93808,116.33286,39.93808"},{"route":"L2","coordinates":"116.33308,39.93806, 116.33304,39.93810, 116.33300,39.93812, 116.33296,39.93812, 116.33290,39.93810,116.33286,39.93808"}]}
    };
    $.post(App.Util.getFullUrl('base/tollcost'), param, function (data) {
        $('#tollCostContent').empty();
        $('#tollCostContent').text(JSON.stringify(data, null, 4));
    });
});
function tollCostResult() {
    var param = {
        coordinates: $('#tollCostCoordinates').val()
    };
    $.post(App.Util.getFullUrl('base/tollcost'), param, function (data) {
        $('#tollCostContent').empty();
        $('#tollCostContent').text(JSON.stringify(data, null, 4));
    });
}
function resetResult() {
    $('#tollCostContent').empty();
    return;
}