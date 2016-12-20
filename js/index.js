/**
 * Created by liwanchong on 2016/12/12.
 */
$(function () {
    // $("#headContainer").PageSwitch({
    //     direction:'horizontal',
    //     easing:'ease-in',
    //     duration:10000,
    //     autoPlay:true,
    //     loop:'false'
    // });
    var screenWidth = window.screen.width;
    var paddingLeft = (screenWidth - 1000) / 2;
    $('#firstImg').css('padding', '0px ' + paddingLeft + 'px')
    $('#secondImg').css('padding', '0px ' + paddingLeft + 'px')
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