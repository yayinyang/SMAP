/**
 * Created by Songlin  Chen on 17.3.9.
 */
/*
for (var i = 0;i < 26;i++){
   s = String.fromCharCode(65+i);
   $('.allFirstLetters').append('<li class="firstLetter"><a href="#">'+ s+'</a></li>')
}
*/

$('#exchangeInput').on('click',function (){
    var tmp = $('#startStation').val();
    $('#startStation').val($('#endStation').val());
    $('#endStation').val(tmp);
});

$('#emptyStartStation').on('click',function (){
   $('#startStation').val('');

});
$('#endStation').focus(function (){
    $('#emptyEndStation').css('display','line-block');
});
$('#emptyEndStation').on('click',function (){
    $('#endStation').val('');
    $('#endStation').attr('placeholder','请选择终点收费站');
});
$('.nowCity').on('click',function(){
    $('.nowCity').hide();
    $('.choosedCity').show();
    $('.cityList').show();
});
$('#hideCityList').on('click',function (){
    $('.choosedCity').hide();
    $('.cityList').hide();
    $('.nowCity').show();
});

$('#endStation').focus(function (){
    var val = $('#startStation').val();
    if(val!=''){
        $('#endStation').attr('placeholder','请选择以下可通达的终点收费站');
    }
});
