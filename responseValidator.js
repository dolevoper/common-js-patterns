const { ValidationError } = require('./validationError');

function validate(questions, response) {
    if (questions.length !== response.length) throw new ValidationError('Must answer all questions');

    for (let i = 0; i < response.length; i++) {
        const question = questions[i];
        const answer = response[i];

        if (typeof answer !== 'number') throw new ValidationError('Each answer must be a number');
        if (answer < 0 || answer >= question.options.length) throw new ValidationError(`Answer to question #${i + 1} out of range`);
    }
}

exports.validate = validate;