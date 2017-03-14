/**
 * Created by Songlin  Chen on 17.3.9.
 */
$('#exchangeInput').on('click',function (){
    var tmp = $('#startStation').val();
    $('#startStation').val($('#endStation').val());
    $('#endStation').val(tmp);
});

$('#endStation').focus(function (){
    $('#emptyEndStation').css('display','inline-block');
});
$('#endStation').blur(function (){
    var val = $('#endStation').val();
    if(val === ''){
        $('#emptyEndStation').css('display','none');
    }else{
        $('#emptyEndStation').css('display','inline-block');
    }

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

