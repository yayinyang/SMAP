/**
 * Created by liwanchong on 2016/12/22.
 */
$(function () {
    var tileParam = {
        level: 18,
        lon: 116.3552,
        lat: 39.93475,
    };
    var tilesParam = {
        level: 18,
        coordinates: '116.38033,40.05565;116.31095,39.9824'
    }

    $.post(App.Util.getFullUrl('coordinate/tile.json'), tileParam, function (data) {
        $('#tileContent').empty();
        $('#tileContent').text(JSON.stringify(data, null, 4));
    });
    $.post(App.Util.getFullUrl('coordinates/tiles.json'), tilesParam, function (data) {
        $('#tilesContent').empty();
        $('#tilesContent').text(JSON.stringify(data, null, 4));
    });
});
function tileResult() {
    var level = $('#tileLevel').val();
    var lon = $('#tileLon').val();
    var lat = $('#tileLat').val();
    var param = {
        level: level,
        lon: lon,
        lat: lat
    };
    $.post(App.Util.getFullUrl('coordinate/tile.json'), param, function (data) {
        $('#tileContent').empty();
        $('#tileContent').text(JSON.stringify(data, null, 4));
    });
}
function tilesResult() {
    var level = $('#tilesLevel').val();
    var coordinates = $('#tilesCoordinates').val();
    var param = {
        level: level,
        coordinates: coordinates
    };
    $.post(App.Util.getFullUrl('coordinates/tiles.json'), param, function (data) {
        $('#tilesContent').empty();
        $('#tilesContent').text(JSON.stringify(data, null, 4));
    });

}
function resetResult(type) {
    if(type === 0) {
        $('#tileContent').empty();
        return;
    }
    $('#tilesContent').empty();
}