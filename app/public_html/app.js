/** God damn I am tired of bugs caused by jQuery selectors silently failing */
function $$(selector) {
    var result = $(selector);
    if (result.length == 0) {
        console.log("Selector did not find a match.", selector);
    }

    return result;
}

//// Custom radio inputs and labels /////////////////////////////

var agreenessNames = ["invalid", "strongly disagree", "disagree", "no opinion", "agree", "strongly agree"];
var agreeLabelClasses = ["", "qval1", "qval2", "qval3", "qval4", "qval5"];
var allAgreeLabelClasses = "qval1 qval2 qval3 qval4 qval5";

$$(".groupdot input[type='radio']").on('change', function () {
    var group = ($$(this)).attr("name");
    var value = parseInt(($$(this)).val());
    var label = $$("#" + group + "value");
    label.removeClass(allAgreeLabelClasses);
    label.addClass(agreeLabelClasses[value] || "")

    label.text(agreenessNames[value] || "");
    $(this).parent().removeClass('survey-question-error');
    checkAllErrorsGone();

});

//// Form submitting/processing /////////////////////////////////

$$("#submit-button").on('click', function (e) {
    e.preventDefault();
    var formData = parseSurveyForm();
    if (formData) {
        processFormData(formData);
    } else {
        $$('#submit-button-error').addClass('survey-button-error');
    }

    console.log(formData);
});

function processFormData(formData) {
    $.post("/api/friends", formData)
        .then(function (result) { 
            console.log(result);
            var status = result.result;
            if (status == "new friend") {
                $$("#nfm-title").text("Meet: " + result.name);
                $$("#nfm-content").empty().append($("<img>").attr('src', result.photoUrl));
            } else if (status == "no friends") {
                $$("#nfm-title").text("No match.");
                $$("#nfm-content").text("Sorry! You're the first person to submit to the database.");
            } else {
                $$("#nfm-title").text("There was an error.");
                if (result.error) {
                    $$("#nfm-content").text("Error details: " + result.error);
                } else {
                    $$("#nfm-content").text("This page could not understand the server response or error details were provided by the server.");
                }
            }
            $$("#new-friend-modal").modal("show");
            
        })
        .catch(function (err) {
            alert("The bad happened.");
            console.log(err);
        });  
}

function parseSurveyForm() {
    clearFormErrorStyles();

    var responses = getAllQuestionResponses();
    var name = $$('#survey-name').val();
    var photoUrl = $$('#survey-photoUrl').val();

    var formValid = name && photoUrl && responses.unanswered.length == 0;

    if (!name) {
        markTextFieldInvalid('survey-name');
    }
    if (!photoUrl) {
        markTextFieldInvalid('survey-photoUrl');
    }
    responses.unanswered.forEach(function (index) {
        markSurveyQuestionInvalid(index);
    });

    if (formValid) {
        return {
            name: name,
            photoUrl: photoUrl,
            scores: responses.values,
        }
    }
}

function getAllQuestionResponses() {
    var values = [];
    var unansweredQuestions = [];
    for (var i = 1; i <= 10; i++) {
        var singleResult = getOneQuestionResponse(i);
        if (singleResult == null) {
            unansweredQuestions.push(i);
        }
        values.push(singleResult);
    }

    return {
        values: values,
        unanswered: unansweredQuestions,
    };
}

function getOneQuestionResponse(questionNumber) {
    var name = 'q' + questionNumber;
    var selector = "input[name='" + name + "']:checked";
    var $input = $(selector);
    if ($input.length) {
        return $input.val() || null;
    } else {
        return null;
    }
}


//// Error notifications ////////////////////////////////////////

$$("#survey-name").on('change', function () {
    clearInputError('survey-name');
});

$$("#survey-name").on('keyup', function () {
    clearInputError('survey-name');
});

$$("#survey-photoUrl").on('change', function () {
    clearInputError('survey-photoUrl');
});

$$("#survey-photoUrl").on('keyup', function () {
    clearInputError('survey-photoUrl');
});

function clearInputError(inputID) {
    if ($$("#" + inputID).val()) {
        $$('label[for="' + inputID + '"]').removeClass('survey-field-error');
    }
    checkAllErrorsGone();
}

function markTextFieldInvalid(inputID) {
    var selector = 'label[for="' + inputID + '"]';
    $$(selector).addClass('survey-field-error');
}

function markSurveyQuestionInvalid(index) {
    var idSelector = '#q' + index + "item";
    $$(idSelector).addClass("survey-question-error");
}

function clearFormErrorStyles() {
    $('.survey-question-error').removeClass('survey-question-error');
    $('.survey-field-error').removeClass('survey-field-error');
}
function checkAllErrorsGone() {
    var errorCount = 0;
    errorCount += $('.survey-question-error').length;
    errorCount += $('.survey-field-error').length;

    if (errorCount == 0) {
        $('.survey-button-error').removeClass('survey-button-error').addClass('survey-button-success');
    }
}
