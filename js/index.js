/**
 * Created by liwanchong on 2016/12/12.
 */
$(function () {
    $(window).resize(resizeCanvas);
    function resizeCanvas() {//浏览器窗口大小变化时，回调函数
        var screenHeight = window.screen.height;
        $('#banner').empty();
        if(screenHeight < 770 ) {

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
function setSize() {

    var height = window.innerHeight;
    var banner = document.getElementById('banner');
    banner.style.height = height + 'px';

}