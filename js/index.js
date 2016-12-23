/**
 * Created by liwanchong on 2016/12/12.
 */
$(function () {
    $("#headContainer").PageSwitch({
        direction:'horizontal',
        duration: 0,
        easing:'ease-in',
        interval: 3000,
        autoPlay:true,
        loop:false,
        callback:function (data) {
            console.log(data);
        }
    });
});
function redirecting(type) {
    if(type === 'load') {
        window.location = 'pages/productWarehouse.html';
    } else {
        window.location = 'pages/productService.html';
    }

}