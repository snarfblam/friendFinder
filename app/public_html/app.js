function parseSurveyForm() {
    var responses = getSurveyValues();
    var name = $('#survey-name').val();
    var photoUrl = $('#survey-photoUrl').val();

    var formInvalid = !name || !photoUrl || responses.unanswered.length != 0;

    if (!name) {
        markTextFieldInvalid('#survey-name');
    }
    if (!photoUrl) {
        markTextFieldInvalid('#survey-photoUrl');
    }
    responses.unanswered.forEach(index => {
        markSurveyQuestionInvalid(index);
    });
}

function markTextFieldInvalid(elementSelector) {
    // Need to create css and apply class
    // error-notice-hidden {display: none}, error-notice-visible {display: inline};
    /*
    add to each li without a selected response
    .survey-question-error::after {
        content: "Please make a selection.";
        color: red;
        display: block;
        font-weight: bold;
    }*/
}

function markSurveyQuestionInvalid(index) {
    // need to create css and find/add ID to select on, and apply class
}

function getSurveyValues() {
    var values = [];
    var unansweredQuestions = [];
    for (var i = 0; i < 10; i++) {
        var singleResult = getQuestionResponse(i);
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

function getQuestionResponse(questionNumber) {
    var name = 'q' + questionNumber;
    var selector = "input[name='q3']:checked";
    var $input = $(input);
    if ($input.length) {
        return$input.val() || null;
    } else {
        return null;
    }
}