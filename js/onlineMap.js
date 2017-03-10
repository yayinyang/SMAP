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
    var tmp = $('#searchInput1').val();
    $('#searchInput1').val($('#searchInput2').val());
    $('#searchInput2').val(tmp);
});

$('.empty-input').on('click',function (){
   $('#searchInput1').val('');
    $('#searchInput2').val('');
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
