/**
 * Created by liwanchong on 2016/12/30.
 */
$(function () {
    var param = {
        ak:E5054opi85fet472087yc56ew
    };
    $.post(App.Util.getFullUrl('construction/feedback'), param, function (data) {
        $('#feedbackConstructionContent').empty();
        $('#feedbackConstructionContent').text(JSON.stringify(data, null, 4));
    });
});
function constructionFeedbackResult() {
    var param = {
        ak: $('#constructionfeedback').val()
    };
    $.post(App.Util.getFullUrl('tollgate/feedback'), param, function (data) {
        $('#feedbackConstructionContent').empty();
        $('#feedbackConstructionContent').text(JSON.stringify(data, null, 4));
    });
}
function resetResult() {
    $('#feedbackConstructionContent').empty();
}