/**
 * Created by liwanchong on 2016/12/12.
 */
$(function () {
    $("#headContainer").PageSwitch({
        direction:'horizontal',
        easing:'ease-in',
        duration:2000,
        autoPlay:true,
        loop:'false'
    });
});
function showMenu() {
    $('#produceHouseNav').css('display', 'block');
}
function showSonMenu() {
    $('#produceHouseNavOfSon').css('display', 'block');
}
function hideMenu() {
    $("#produceHouseNav").css('display', 'none');
    $('#produceHouseNavOfSon').css('display', 'none');
}