/**
 * Created by liwanchong on 2016/12/30.
 */
$(function () {
    var meshParam = {
        coordinate: '116.45623,39.9202'
    };
    var meshesParam = {
        coordinates: '116.38033,40.05565;116.38046,40.05567'
    };
    $.post(App.Util.getFullUrl('coordinate/mesh.json'), meshParam, function (data) {
        $('#meshContent').empty();
        $('#meshContent').text(JSON.stringify(data, null, 4));
    });
    $.post(App.Util.getFullUrl('coordinates/meshes.json'), meshesParam, function (data) {
        $('#meshesContent').empty();
        $('#meshesContent').text(JSON.stringify(data, null, 4));
    });
});
function meshResult() {
    var coordinate = $('#meshCoordinates').val();
    var param  = {
        coordinate: coordinate
    }
    $.post(App.Util.getFullUrl('coordinate/mesh.json'), param, function (data) {
        $('#meshContent').empty();
        $('#meshContent').text(JSON.stringify(data, null, 4));
    });
}
function meshesResult() {
    var coordinates = $('#meshesCoordinates').val();
    var param = {
        coordinates: coordinates
    }
    $.post(App.Util.getFullUrl('coordinates/meshes.json'), param, function (data) {
        $('#meshesContent').empty();
        $('#meshesContent').text(JSON.stringify(data, null, 4));
    });
}
function resetResult(type) {
    if(type === 0) {
        $('#meshContent').empty();
        return;
    }
    $('#meshContent').empty();
}