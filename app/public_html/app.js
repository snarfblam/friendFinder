var agreenessNames = ["invalid", "strongly disagree", "disagree", "no opinion", "agree", "strongly agree"];
var agreeLabelClasses = ["", "qval1", "qval2", "qval3", "qval4", "qval5"];
var allAgreeLabelClasses = "qval1 qval2 qval3 qval4 qval5";

$(".groupdot input[type='radio']").on('click', function () {
    var group = ($(this)).attr("name");
    var value = parseInt(($(this)).val());
    var label = $("#" + group + "value");
    label.removeClass(allAgreeLabelClasses);
    label.addClass(agreeLabelClasses[value] || "")
    
    label.text(agreenessNames[value] || "");
});