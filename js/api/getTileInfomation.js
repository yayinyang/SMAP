/**
 * Created by liwanchong on 2016/12/22.
 */
$(function () {
    var param = {
        level: 18,
        lon: 116.3552,
        lat: 39.93475,
    }

    $.post(App.Util.getFullUrl('coordinate/tile.json'),param,function (data) {
        console.log(data);
    })
});
function runTileInfoApi() {

}