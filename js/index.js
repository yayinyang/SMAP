/**
 * Created by liwanchong on 2016/12/12.
 */
$(function () {
    $(window).resize(resizeCanvas);
    function resizeCanvas() {//浏览器窗口大小变化时，回调函数
        var width = window.innerWidth;
        $('#banner').empty();
        if(width < 1440 ) {

            $('#banner').load('pages/carousel/smallCarousel.html');
        }else {
            $('#banner').load('pages/carousel/bigCarousel.html');
        }

    };
    resizeCanvas();
});
function redirecting(type) {
    if(type === 'load') {
        window.location = 'pages/productService.html';
    } else {
        window.location = 'pages/productWarehouse.html?specid=11&&specName=IDB';
    }

}
function redirectingAPi() {
    window.location = 'pages/productService.html';
}

function setNavbarBackground() {
    var body = $('body');
    var btn = $('#backToTop');
    if(body && btn ){
        if(body[0].scrollTop > 0){
            btn.show(200);
        }else {
            btn.hide(200);
        }
    }
}
$(function () {
   var btn = $('#backToTop');
   btn.on('click',function () {
       var body = $('body');
       body.animate({scrollTop: 0}, 200);
   })
});