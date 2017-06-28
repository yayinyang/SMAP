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
    var navbar = $('nav-bar');
    var body = $('body');
    var banner = $('#banner');
    if(body && navbar[0].children[0]){
        if(body[0].scrollTop > (banner[0].clientHeight -44)){ // 44px为导航栏高度
            navbar[0].children[0].style.background = '#25396e';
        }else {
            navbar[0].children[0].style.background = 'none';
        }
    }
}
