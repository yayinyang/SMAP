/**
 * Created by liwanchong on 2016/12/30.
 */
$(function () {
    var lonLatParam = {
        level: 19,
        coordinate: '116.26042,39.956'
    };
    $.post(App.Util.getFullUrl('coordinate/pois.json'), lonLatParam, function (data) {
        $('#lonLatContent').empty();
        $('#lonLatContent').text(JSON.stringify(data, null, 4));
    });
    var tileParam = {
        level: 18,
        tilex: 431460,
        tiley: 198568,
    };
    $.post(App.Util.getFullUrl('tile/pois.json'), tileParam, function (data) {
        $('#tileContent').empty();
        $('#tileContent').text(JSON.stringify(data, null, 4));
    });
    var tilesParam = {
        level: 19,
        tiles: '431460,198568;431534,198511'
    }
    $.post(App.Util.getFullUrl('tiles/pois.json'), tilesParam, function (data) {
        $('#tilesContent').empty();
        $('#tilesContent').text(JSON.stringify(data, null, 4));
    });
    var fuzzyParam = {
        name: '文化餐厅'
    };
    $.post(App.Util.getFullUrl('fuzzy/pois.json'), fuzzyParam, function (data) {
        $('#fuzzyContent').empty();
        $('#fuzzyContent').text(JSON.stringify(data, null, 4));
    });
    var poisCoorsParam = {
        name: '重庆火锅'
    };
    $.post(App.Util.getFullUrl('fuzzy/poiscoors.json'), poisCoorsParam, function (data) {
        $('#poisCoorsContent').empty();
        $('#poisCoorsContent').text(JSON.stringify(data, null, 4));
    });
    var meshPoiParam = {
        coordinate:'116.23742,39.91661'
    }
    $.post(App.Util.getFullUrl('coordinate/meshpoi.json'), meshPoiParam, function (data) {
        $('#meshPoiContent').empty();
        $('#meshPoiContent').text(JSON.stringify(data, null, 4));
    });
    var meshPoiResParam = {
        coordinate: '116.36335,39.91639',
    };
    $.post(App.Util.getFullUrl('coordinate/meshpoi_res.json'), meshPoiResParam, function (data) {
        $('#meshPoiResContent').empty();
        $('#meshPoiResContent').text(JSON.stringify(data, null, 4));
    });
    var restaurantParam = {
        level: 19,
        tilex: 431460,
        tiley: 198568
    };
    $.post(App.Util.getFullUrl('tile/pois/restaurant.json'), restaurantParam, function (data) {
        $('#restaurantContent').empty();
        $('#restaurantContent').text(JSON.stringify(data, null, 4));
    });
});
function lonLatResult() {
    var param = {
        level: $('#lonLatLevel').val(),
        coordinate: $('#lonLatCoordinate').val()
    };
    $.post(App.Util.getFullUrl('coordinate/pois.json'), param, function (data) {
        $('#lonLatContent').empty();
        $('#lonLatContent').text(JSON.stringify(data, null, 4));
    });
}
function tileResult() {
    var param = {
        level: $('#tileLevel').val(),
        tilex: $('#tileX').val(),
        tiley: $('#tileY').val()
    };
    $.post(App.Util.getFullUrl('tile/pois.json'), param, function (data) {
        $('#tileContent').empty();
        $('#tileContent').text(JSON.stringify(data, null, 4));
    });
}
function tilesResult() {
    var param = {
        level: $('#tilesLevel').val(),
        tiles: $('#tiles').val()
    };
    $.post(App.Util.getFullUrl('tiles/pois.json'), param, function (data) {
        $('#tilesContent').empty();
        $('#tilesContent').text(JSON.stringify(data, null, 4));
    });
}
function fuzzyResult() {
    var param = {
        name: $('#fuzzyName').val()
    };
    $.post(App.Util.getFullUrl('fuzzy/pois.json'), param, function (data) {
        $('#fuzzyContent').empty();
        $('#fuzzyContent').text(JSON.stringify(data, null, 4));
    });
}
function poisCoorsResult() {
    var param = {
        name: $('#poisCoorsName').val()
    };
    $.post(App.Util.getFullUrl('fuzzy/poiscoors.json'), param, function (data) {
        $('#poisCoorsContent').empty();
        $('#poisCoorsContent').text(JSON.stringify(data, null, 4));
    });
}
function meshPoiResult() {
    var param = {
        coordinate: $('#meshPoiCoordinate').val()
    };
    $.post(App.Util.getFullUrl('coordinate/meshpoi.json'), param, function (data) {
        $('#meshPoiContent').empty();
        $('#meshPoiContent').text(JSON.stringify(data, null, 4));
    });
}
function meshPoiResResult() {
    var param = {
        coordinate: $('#meshPoiResCoordinate').val()
    };
    $.post(App.Util.getFullUrl('coordinate/meshpoi_res.json'), param, function (data) {
        $('#meshPoiResContent').empty();
        $('#meshPoiResContent').text(JSON.stringify(data, null, 4));
    });
}
function restaurantResult() {
    var param = {
        level: $('#restaurantLevel').val(),
        tilex: $('#restaurantTileX').val(),
        tiley: $('#restaurantTileY').val()
    }
    $.post(App.Util.getFullUrl('tile/pois/restaurant.json'), param, function (data) {
        $('#restaurantContent').empty();
        $('#restaurantContent').text(JSON.stringify(data, null, 4));
    });
}
function resetResult(type) {
    if(type === 0) {
        $('#lonLatContent').empty();
    } else if(type === 1) {
        $('#tileContent').empty();
    } else if(type === 2) {
        $('#tilesContent').empty();
    } else if(type === 3) {
        $('#fuzzyContent').empty();
    } else if(type === 4) {
        $('#poisCoorsContent').empty();
    } else if(type === 5) {
        $('#meshPoiContent').empty();
    } else if(type === 6) {
        $('#meshPoiResContent').empty();
    } else {
        $('#restaurantContent').empty();
    }
}