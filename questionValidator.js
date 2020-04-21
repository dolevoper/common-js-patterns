const { ValidationError } = require('./validationError');

function validate(questions) {
    if (!Array.isArray(questions)) throw new ValidationError('`questions` must be an array');
    if (!questions.length) throw new ValidationError('`questions` must contain at least 1 member');

    questions.forEach(validateQuestion);
}

function validateQuestion(question) {
    const { text, options } = question;

    if (!text) throw new ValidationError('Question must have `text` field');
    if (!options) throw new ValidationError('Question must have `options` field');

    if (typeof text !== 'string') throw new ValidationError('`text` must be a string');
    if (!Array.isArray(options)) throw new ValidationError('`options` must be an array');

    if (options.length < 2) throw new ValidationError('`options` must contain at least 2 members');

    if (options.some(option => typeof option !== 'string')) throw new ValidationError('members of `options` must be strings');
}

exports.validate = validate;