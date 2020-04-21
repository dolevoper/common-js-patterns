const { templates, surveys } = require('./repositories');
const questionValidator = require('./questionValidator');

async function defineSurvey(title, questions) {
    // TODO: authorization
    
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

    // TODO: response validation

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