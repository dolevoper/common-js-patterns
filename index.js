const { templates, surveys } = require('./repositories');
const { ValidationError } = require('./validationError');
const questionValidator = require('./questionValidator');
const responseValidator = require('./responseValidator');

async function defineSurvey(title, questions) {
    // TODO: authorization
    
    if (typeof title !== 'string') throw new ValidationError('`title` must be a string');
    if (!title.length) throw new ValidationError('`title` cannot be empty');

    questionValidator.validate(questions);

    await templates.insert({ title, questions });
}

async function openSurvey(templateId) {
    // TODO: authorization
    const template = await templates.getById(templateId);

    if (template.open) throw new Error(`Survey ${templateId} is already open.`);

    await Promise.all([
        surveys.insert({ templateId, responses: [] }),
        templates.put(templateId, { ...template, open: true })
    ]);
}

async function closeSurvey(surveyId) {
    // TODO: authorization
    const survey = await surveys.getById(surveyId);

    if (survey.closed) throw new Error(`Survey ${surveyId} is already closed.`);

    const template = await templates.getById(survey.templateId);

    await Promise.all([
        surveys.put(surveyId, { ...survey, closed: true }),
        templates.put(survey.templateId, { ...template, open: false })
    ]);
}

async function submitResponse(surveyId, response) {
    const survey = await surveys.getById(surveyId);

    if (survey.closed) throw new Error(`Survey ${surveyId} is aleady closed.`);

    const { questions } = await templates.getById(survey.templateId);

    responseValidator.validate(questions, response);

    await surveys.put(surveyId, { ...survey, resposnes: survey.responses.concat([response]) });
}

async function getResults(surveyId) {
    const survey = await surveys.getById(surveyId);

    if (!survey.closed) throw new Error(`Survey ${surveyId} is still ongoing.`);

    const results = {}; // TODO: calculate results table from responses

    return results;
}

exports.defineSurvey = defineSurvey;
exports.openSurvey = openSurvey;
exports.closeSurvey = closeSurvey;
exports.submitResponse = submitResponse;
exports.getResults = getResults;